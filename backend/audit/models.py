from django.db import models
from django.contrib.auth.models import User

class AuditLog(models.Model):
    actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=255)
    content_type = models.CharField(max_length=100, blank=True)
    object_id = models.CharField(max_length=100, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.JSONField(default=dict, blank=True)
    
    class Meta:
        ordering = ['-timestamp']
        permissions = [
            ("view_auditlog_readonly", "Can view audit log (read only)"),
        ]
    
    def save(self, *args, **kwargs):
        # Prevent updates
        if self.pk:
            raise Exception("Audit logs cannot be modified")
        super().save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        raise Exception("Audit logs cannot be deleted")
    
    def __str__(self):
        return f"{self.actor} - {self.action} - {self.timestamp}"
