from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from customers.models import Customer
from crm.models import Lead
from projects.models import Project
from services.models import Service
from portfolio.models import PortfolioItem
from notifications.models import Notification


@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard_summary(request):
    return Response({
        'customers': Customer.objects.count(),
        'leads_total': Lead.objects.count(),
        'leads_new': Lead.objects.filter(status='new').count(),
        'projects_active': Project.objects.filter(status='in_progress').count(),
        'services_active': Service.objects.filter(is_active=True).count(),
        'portfolio_published': PortfolioItem.objects.filter(is_published=True).count(),
        'notifications_unread': Notification.objects.filter(recipient=request.user, is_read=False).count(),
    })
