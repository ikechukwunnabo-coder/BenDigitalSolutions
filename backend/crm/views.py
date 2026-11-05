from rest_framework import viewsets, permissions
from .models import Lead
from .serializers import LeadSerializer
from notifications.models import Notification
from django.contrib.auth.models import User

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def perform_create(self, serializer):
        lead = serializer.save()
        # Create notification for admins
        admins = User.objects.filter(is_staff=True)
        for admin in admins:
            Notification.objects.create(
                recipient=admin,
                title='New Enquiry',
                message=f'New enquiry from {lead.name}',
                notification_type='enquiry'
            )
