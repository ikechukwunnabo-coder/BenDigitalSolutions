from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'customer', 'status', 'start_date', 'created_at']
    list_filter = ['status']
    search_fields = ['title', 'customer__name']
