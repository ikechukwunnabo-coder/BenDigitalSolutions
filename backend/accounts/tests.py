from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class AuthApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff = User.objects.create_user(username='staff', password='pass12345', is_staff=True)
        self.user = User.objects.create_user(username='user', password='pass12345', is_staff=False)

    def test_csrf_endpoint(self):
        res = self.client.get('/api/auth/csrf/')
        self.assertEqual(res.status_code, 200)

    def test_staff_login_and_me(self):
        res = self.client.post('/api/auth/login/', {'username': 'staff', 'password': 'pass12345'}, format='json')
        self.assertEqual(res.status_code, 200)
        res = self.client.get('/api/auth/me/')
        self.assertEqual(res.status_code, 200)
        self.assertTrue(res.data['user']['is_staff'])

    def test_non_staff_login_rejected(self):
        res = self.client.post('/api/auth/login/', {'username': 'user', 'password': 'pass12345'}, format='json')
        self.assertEqual(res.status_code, 401)

    def test_dashboard_requires_admin(self):
        res = self.client.get('/api/dashboard/summary/')
        self.assertIn(res.status_code, [401, 403])
        self.client.force_authenticate(user=self.staff)
        res = self.client.get('/api/dashboard/summary/')
        self.assertEqual(res.status_code, 200)
        self.assertIn('leads_total', res.data)
