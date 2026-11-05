from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class CustomerPermissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff = User.objects.create_user(username='staff', password='pass12345', is_staff=True)

    def test_customers_require_auth(self):
        res = self.client.get('/api/customers/')
        self.assertIn(res.status_code, [401, 403])
        self.client.force_authenticate(user=self.staff)
        res = self.client.get('/api/customers/')
        self.assertEqual(res.status_code, 200)
