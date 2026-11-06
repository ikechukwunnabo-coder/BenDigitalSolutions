from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Service


class ServiceApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff = User.objects.create_user(username='staff', password='pass12345', is_staff=True)
        Service.objects.create(title='Active Service', slug='active-service', description='Visible', is_active=True)
        Service.objects.create(title='Hidden Service', slug='hidden-service', description='Hidden', is_active=False)

    def test_public_list_shows_only_active_services(self):
        res = self.client.get('/api/services/')
        self.assertEqual(res.status_code, 200)
        data = res.data['results'] if isinstance(res.data, dict) and 'results' in res.data else res.data
        slugs = [item['slug'] for item in data]
        self.assertIn('active-service', slugs)
        self.assertNotIn('hidden-service', slugs)

    def test_public_cannot_create_service(self):
        res = self.client.post('/api/services/', {'title': 'X', 'description': 'Y', 'is_active': True}, format='json')
        self.assertIn(res.status_code, [401, 403])
        self.assertFalse(Service.objects.filter(title='X').exists())

    def test_staff_can_create_service(self):
        self.client.force_authenticate(user=self.staff)
        res = self.client.post('/api/services/', {'title': 'Consulting', 'description': 'Y', 'is_active': True}, format='json')
        self.assertEqual(res.status_code, 201)
        self.assertTrue(Service.objects.filter(slug='consulting').exists())
