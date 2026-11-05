from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date, timedelta
from services.models import Service
from portfolio.models import PortfolioItem
from customers.models import Customer
from crm.models import Lead
from projects.models import Project


class Command(BaseCommand):
    help = 'Seed demo data for local testing (idempotent-ish)'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin12345')
            self.stdout.write(self.style.SUCCESS('Created superuser admin / admin12345'))
        else:
            self.stdout.write('Superuser admin already exists')

        services = [
            ('Web Development', 'Custom websites and web applications tailored to business needs.', 'Responsive design\nSEO foundations\nAdmin integration'),
            ('Digital Strategy', 'Practical planning to improve online presence and lead generation.', 'Discovery\nRoadmap\nImplementation guidance'),
            ('Business Process Support', 'Digital tools to help manage customers, enquiries, and delivery.', 'Workflow setup\nTraining\nOngoing support'),
        ]
        for title, desc, features in services:
            Service.objects.get_or_create(title=title, defaults={'description': desc, 'features': features, 'is_active': True})

        PortfolioItem.objects.get_or_create(
            slug='sample-business-platform',
            defaults={
                'title': 'Sample Business Platform', 'client': 'Demo Client', 'description': 'A sample project showcasing digital delivery.',
                'project_date': date.today() - timedelta(days=30), 'is_published': True, 'is_featured': True, 'published_at': timezone.now(),
            }
        )
        cust, _ = Customer.objects.get_or_create(email='demo@customer.com', defaults={'name': 'Demo Customer', 'phone': '08012345678', 'company': 'Demo Co'})
        Project.objects.get_or_create(title='Demo Project', customer=cust, defaults={'description': 'Sample active project', 'status': 'in_progress'})
        if not Lead.objects.filter(email='lead@example.com').exists():
            Lead.objects.create(name='Demo Lead', email='lead@example.com', phone='08099999999', service='Web Development', message='Interested in a new website', status='new')
        self.stdout.write(self.style.SUCCESS('Demo data seeded.'))
