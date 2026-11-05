from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'price', 'created_at']
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ['is_active']
