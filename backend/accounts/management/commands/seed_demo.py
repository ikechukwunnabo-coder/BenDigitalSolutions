from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date, timedelta
from decimal import Decimal
from services.models import Service
from portfolio.models import PortfolioItem
from customers.models import Customer
from crm.models import Lead
from projects.models import Project
from notifications.models import Notification


class Command(BaseCommand):
    help = 'Seed vision-aligned demo data for the approved MVP (idempotent). Does not create deferred modules/schemas.'

    def add_arguments(self, parser):
        parser.add_argument('--password', default='admin12345', help='Password for demo admin user if created')

    def handle(self, *args, **options):
        admin, created = User.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@bendigitalsolutions.local', 'is_staff': True, 'is_superuser': True},
        )
        if created:
            admin.set_password(options['password'])
            admin.save()
            self.stdout.write(self.style.SUCCESS(f"Created superuser admin / {options['password']}"))
        else:
            if not admin.is_staff:
                admin.is_staff = True
                admin.is_superuser = True
                admin.save()
            self.stdout.write('Superuser admin already exists')

        # Services showcase the product vision while staying within MVP schema.
        services = [
            {
                'title': 'Digital Presence & Lead Generation',
                'description': 'Attract potential customers with a professional website, clear service messaging, and enquiry capture that turns visitors into qualified leads.',
                'features': 'Landing and service pages\nPortfolio showcase\nContact/enquiry capture\nLead follow-up workflow (MVP)\nRoadmap: marketing automation',
                'price': Decimal('150000.00'),
            },
            {
                'title': 'Client Project Delivery Workspace',
                'description': 'Manage client projects from onboarding to delivery with status tracking, customer records, and internal visibility for your team.',
                'features': 'Customer records\nProject status tracking\nAdmin dashboard\nRoadmap: quotations/proposals, invoices, milestones',
                'price': Decimal('250000.00'),
            },
            {
                'title': 'Digital Commerce Foundation',
                'description': 'Prepare your business for secure digital sales. MVP establishes service/catalog foundations and customer relationships for future commerce modules.',
                'features': 'Service catalogue\nCustomer history\nRoadmap: online payments, digital products, secure downloads, subscriptions',
                'price': Decimal('200000.00'),
            },
            {
                'title': 'Learning & Customer Enablement Platform',
                'description': 'A foundation for training and customer education experiences, aligned with the long-term LMS and customer communication vision.',
                'features': 'Content-ready platform structure\nCustomer/project context\nRoadmap: courses/LMS, automated communication, progress tracking',
                'price': Decimal('300000.00'),
            },
            {
                'title': 'Business Intelligence & SaaS Readiness',
                'description': 'Operational visibility today and a scalable path to analytics, subscriptions, and future SaaS applications.',
                'features': 'Admin dashboard summary\nAudit visibility\nNotification workflows\nRoadmap: BI reports, subscriptions, multi-tenant SaaS',
                'price': None,
            },
        ]
        for s in services:
            obj, _ = Service.objects.update_or_create(
                title=s['title'],
                defaults={
                    'description': s['description'],
                    'features': s['features'],
                    'price': s['price'],
                    'is_active': True,
                },
            )

        today = date.today()
        portfolio_items = [
            {
                'slug': 'lead-generation-platform',
                'defaults': dict(
                    title='Lead Generation Platform for Professional Services',
                    client='Apex Consulting',
                    description='Delivered a public-facing digital presence with service pages, portfolio proof, and enquiry capture to attract potential customers and generate leads. Designed to extend into quotations and client portals.',
                    project_date=today - timedelta(days=120),
                    image_url='',
                    is_featured=True,
                    is_published=True,
                    published_at=timezone.now() - timedelta(days=110),
                ),
            },
            {
                'slug': 'client-delivery-operations-hub',
                'defaults': dict(
                    title='Client Delivery Operations Hub',
                    client='PrimeBuild Projects',
                    description='Implemented customer records and project tracking workflows to improve delivery visibility. Foundation supports future invoicing, payment status, and reporting modules.',
                    project_date=today - timedelta(days=75),
                    image_url='',
                    is_featured=True,
                    is_published=True,
                    published_at=timezone.now() - timedelta(days=70),
                ),
            },
            {
                'slug': 'digital-catalog-roadmap-blueprint',
                'defaults': dict(
                    title='Digital Catalog & Commerce Roadmap Blueprint',
                    client='Nova Retail Group',
                    description='Showcased services and mapped a phased roadmap for digital products, secure downloads, and subscriptions. MVP delivery focused on approved catalog, CRM, and admin capabilities.',
                    project_date=today - timedelta(days=30),
                    image_url='',
                    is_featured=False,
                    is_published=True,
                    published_at=timezone.now() - timedelta(days=25),
                ),
            },
            {
                'slug': 'internal-lms-discovery-draft',
                'defaults': dict(
                    title='Internal LMS Discovery (Draft)',
                    client='LearnForward Initiative',
                    description='Discovery concept for online courses and automated learner communication. Kept unpublished in MVP pending future LMS scope approval.',
                    project_date=today - timedelta(days=10),
                    image_url='',
                    is_featured=False,
                    is_published=False,
                    published_at=None,
                ),
            },
        ]
        for item in portfolio_items:
            PortfolioItem.objects.update_or_create(slug=item['slug'], defaults=item['defaults'])

        customers = [
            dict(name='Apex Consulting', email='contact@apexconsulting.demo', phone='+2348010001001', company='Apex Consulting', address='Port Harcourt, Rivers', notes='Interested in lead generation, proposals/quotations workflow (future), and reporting.'),
            dict(name='PrimeBuild Projects', email='ops@primebuild.demo', phone='+2348010001002', company='PrimeBuild Projects', address='Port Harcourt, Rivers', notes='Active delivery client; future needs include invoices and payment tracking.'),
            dict(name='Nova Retail Group', email='hello@novaretail.demo', phone='+2348010001003', company='Nova Retail Group', address='Lagos', notes='Evaluating digital products, secure downloads, and subscriptions roadmap.'),
            dict(name='LearnForward Initiative', email='team@learnforward.demo', phone='+2348010001004', company='LearnForward Initiative', address='Abuja', notes='Future LMS/courses and automated communication candidate.'),
        ]
        customer_objs = {}
        for c in customers:
            obj, _ = Customer.objects.update_or_create(email=c['email'], defaults=c)
            customer_objs[c['email']] = obj

        leads = [
            dict(name='Chidinma Okafor', email='chidinma@prospect.demo', phone='+2348020002001', service='Digital Presence & Lead Generation', message='We need a platform to attract customers and manage incoming enquiries.', status='new', source='website'),
            dict(name='Tunde Balogun', email='tunde@prospect.demo', phone='+2348020002002', service='Client Project Delivery Workspace', message='Looking to manage client projects and prepare for quotations/invoicing later.', status='contacted', source='website'),
            dict(name='Amaka Nwosu', email='amaka@prospect.demo', phone='+2348020002003', service='Digital Commerce Foundation', message='We want to sell digital products and accept payments in a later phase.', status='qualified', source='referral'),
            dict(name='Ibrahim Musa', email='ibrahim@prospect.demo', phone='+2348020002004', service='Learning & Customer Enablement Platform', message='Interested in future online courses and automated customer communication.', status='new', source='website'),
        ]
        admin_user = admin
        for i, l in enumerate(leads):
            defaults = dict(l)
            if defaults['status'] != 'new':
                defaults['assigned_to'] = admin_user
            Lead.objects.update_or_create(email=l['email'], defaults=defaults)

        projects = [
            dict(customer=customer_objs['contact@apexconsulting.demo'], title='Apex Lead Capture & Service Showcase', description='MVP implementation: public site, services/portfolio, enquiry-to-lead flow, and admin follow-up. Future phase placeholder: proposals/quotations.', status='in_progress', start_date=today - timedelta(days=21)),
            dict(customer=customer_objs['ops@primebuild.demo'], title='PrimeBuild Delivery Tracking', description='Customer/project tracking with notifications and audit visibility. Future phase placeholder: invoicing and payment reconciliation.', status='in_progress', start_date=today - timedelta(days=14)),
            dict(customer=customer_objs['hello@novaretail.demo'], title='Nova Commerce Readiness Assessment', description='Catalog and CRM foundation delivered; roadmap documented for digital products, secure downloads, and subscriptions.', status='pending', start_date=today + timedelta(days=7)),
        ]
        for p in projects:
            Project.objects.update_or_create(customer=p['customer'], title=p['title'], defaults=p)

        # In-app notifications (MVP) reflecting vision-aligned operational events.
        demo_notifications = [
            ('New lead: Digital Presence enquiry', 'Chidinma Okafor submitted an enquiry about attracting customers and managing leads.', 'enquiry', '/admin/leads'),
            ('Qualified lead: Commerce roadmap', 'Amaka Nwosu is qualified; capture requirements for future payments and digital products scope.', 'status_change', '/admin/leads'),
            ('Project follow-up reminder', 'Review PrimeBuild delivery milestones; future phase may include invoicing workflow.', 'general', '/admin/projects'),
            ('Vision alignment note', 'Current MVP covers approved 8 modules. Deferred: quotations/invoices/payments/digital products/LMS/BI/subscriptions/SaaS.', 'general', '/admin'),
        ]
        for title, message, ntype, link in demo_notifications:
            Notification.objects.get_or_create(recipient=admin_user, title=title, defaults={'message': message, 'notification_type': ntype, 'link': link, 'is_read': False})

        self.stdout.write(self.style.SUCCESS('Vision-aligned MVP demo data seeded (deferred features represented as roadmap notes only).'))
