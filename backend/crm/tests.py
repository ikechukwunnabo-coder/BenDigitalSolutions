from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import Lead
from notifications.models import Notification


class EnquiryApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_user(username='admin', password='pass12345', is_staff=True)

    def test_submit_enquiry_creates_lead_and_notification(self):
        payload = {
            'name': 'Test Client',
            'email': 'client@example.com',
            'phone': '08000000000',
            'service': 'Web Development',
            'message': 'I need a website',
        }
        res = self.client.post('/api/enquiries/', payload, format='json')
        self.assertEqual(res.status_code, 201)
        self.assertEqual(Lead.objects.count(), 1)
        self.assertEqual(Notification.objects.filter(recipient=self.admin, notification_type='enquiry').count(), 1)
        self.assertEqual(Lead.objects.first().status, 'new')

    def test_enquiry_validation(self):
        res = self.client.post('/api/enquiries/', {'name': 'X'}, format='json')
        self.assertEqual(res.status_code, 400)

    def test_public_cannot_set_lead_status(self):
        payload = {
            'name': 'Test Client',
            'email': 'client@example.com',
            'phone': '08000000000',
            'message': 'I need help',
            'status': 'converted',
        }
        res = self.client.post('/api/enquiries/', payload, format='json')
        self.assertEqual(res.status_code, 201)
        self.assertEqual(Lead.objects.first().status, 'new')
