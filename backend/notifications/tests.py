from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Notification


class NotificationApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='staff', password='pass12345', is_staff=True)
        self.other = User.objects.create_user(username='other', password='pass12345', is_staff=True)
        self.note = Notification.objects.create(recipient=self.user, title='Hello', message='Test')
        Notification.objects.create(recipient=self.other, title='Other', message='Nope')

    def test_notifications_require_auth(self):
        res = self.client.get('/api/notifications/')
        self.assertIn(res.status_code, [401, 403])

    def test_user_sees_only_own_notifications(self):
        self.client.force_authenticate(user=self.user)
        res = self.client.get('/api/notifications/')
        self.assertEqual(res.status_code, 200)
        data = res.data['results'] if isinstance(res.data, dict) and 'results' in res.data else res.data
        titles = [item['title'] for item in data]
        self.assertIn('Hello', titles)
        self.assertNotIn('Other', titles)

    def test_mark_read(self):
        self.client.force_authenticate(user=self.user)
        res = self.client.post(f'/api/notifications/{self.note.id}/mark_read/', {}, format='json')
        self.assertEqual(res.status_code, 200)
        self.note.refresh_from_db()
        self.assertTrue(self.note.is_read)
        self.assertIsNotNone(self.note.read_at)
