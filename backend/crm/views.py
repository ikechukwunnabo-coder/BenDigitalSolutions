from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .models import Lead
from .serializers import LeadSerializer
from notifications.models import Notification
from django.contrib.auth.models import User


def notify_admins(title, message, notification_type='general', link=''):
    admins = User.objects.filter(is_staff=True, is_active=True)
    for admin in admins:
        Notification.objects.create(
            recipient=admin,
            title=title,
            message=message,
            notification_type=notification_type,
            link=link,
        )


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), permissions.IsAdminUser()]

    def perform_create(self, serializer):
        lead = serializer.save()
        notify_admins('New Enquiry', f'New enquiry from {lead.name}', 'enquiry', f'/admin/leads/{lead.id}')

    def perform_update(self, serializer):
        old_status = self.get_object().status
        lead = serializer.save()
        if old_status != lead.status:
            notify_admins(
                'Lead Status Updated',
                f'Lead {lead.name} status changed to {lead.status}',
                'status_change',
                f'/admin/leads/{lead.id}',
            )


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def submit_enquiry(request):
    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
        lead = serializer.save(source=request.data.get('source', 'website'))
        notify_admins('New Enquiry', f'New enquiry from {lead.name}', 'enquiry')
        return Response({'status': 'success', 'message': 'Enquiry submitted successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'status': 'error', 'message': 'Validation failed', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
