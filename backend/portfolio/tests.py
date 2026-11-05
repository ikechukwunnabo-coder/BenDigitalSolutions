from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import PortfolioItem
from datetime import date


class PortfolioApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.staff = User.objects.create_user(username='staff', password='pass12345', is_staff=True)
        PortfolioItem.objects.create(title='Public', slug='public', client='A', description='x', project_date=date.today(), is_published=True)
        PortfolioItem.objects.create(title='Draft', slug='draft', client='B', description='x', project_date=date.today(), is_published=False)

    def test_public_sees_only_published(self):
        res = self.client.get('/api/portfolio/')
        self.assertEqual(res.status_code, 200)
        data = res.data['results'] if isinstance(res.data, dict) and 'results' in res.data else res.data
        slugs = [i['slug'] for i in data]
        self.assertIn('public', slugs)
        self.assertNotIn('draft', slugs)

    def test_admin_sees_all(self):
        self.client.force_authenticate(user=self.staff)
        res = self.client.get('/api/portfolio/')
        data = res.data['results'] if isinstance(res.data, dict) and 'results' in res.data else res.data
        slugs = [i['slug'] for i in data]
        self.assertIn('draft', slugs)
