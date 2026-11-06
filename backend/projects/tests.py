from datetime import date

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from customers.models import Customer
from .models import Project


class ProjectApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff = User.objects.create_user(username='staff', password='pass12345', is_staff=True)
        self.customer = Customer.objects.create(name='Acme', email='acme@example.com', phone='0800')

    def test_projects_require_admin(self):
        res = self.client.get('/api/projects/')
        self.assertIn(res.status_code, [401, 403])

    def test_staff_can_create_and_update_project(self):
        self.client.force_authenticate(user=self.staff)
        res = self.client.post(
            '/api/projects/',
            {
                'customer': self.customer.id,
                'title': 'Website',
                'description': 'Build site',
                'status': 'pending',
                'start_date': str(date.today()),
            },
            format='json',
        )
        self.assertEqual(res.status_code, 201)
        project_id = res.data['id']
        res = self.client.patch(f'/api/projects/{project_id}/', {'status': 'in_progress'}, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(Project.objects.get(id=project_id).status, 'in_progress')
