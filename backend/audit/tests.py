from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from .models import AuditLog


class AuditApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff = User.objects.create_user(username='staff', password='pass12345', is_staff=True)
        self.user = User.objects.create_user(username='user', password='pass12345', is_staff=False)
        AuditLog.objects.create(action='test action', details={'k': 'v'})

    def test_audit_requires_admin(self):
        res = self.client.get('/api/audit/')
        self.assertIn(res.status_code, [401, 403])
        self.client.force_authenticate(user=self.user)
        res = self.client.get('/api/audit/')
        self.assertIn(res.status_code, [401, 403])

    def test_admin_can_read_audit_logs(self):
        self.client.force_authenticate(user=self.staff)
        res = self.client.get('/api/audit/')
        self.assertEqual(res.status_code, 200)
        data = res.data['results'] if isinstance(res.data, dict) and 'results' in res.data else res.data
        self.assertTrue(any(item['action'] == 'test action' for item in data))

    def test_audit_model_is_immutable(self):
        log = AuditLog.objects.first()
        with self.assertRaises(Exception):
            log.action = 'changed'
            log.save()
        with self.assertRaises(Exception):
            log.delete()
