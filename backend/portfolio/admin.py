from django.contrib import admin
from .models import PortfolioItem

@admin.register(PortfolioItem)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['title', 'client', 'is_published', 'project_date', 'created_at']
    list_filter = ['is_published']
    prepopulated_fields = {'slug': ('title',)}
    actions = ['publish', 'unpublish']
    def publish(self, request, queryset):
        queryset.update(is_published=True)
    publish.short_description = 'Publish selected items'
    def unpublish(self, request, queryset):
        queryset.update(is_published=False)
    unpublish.short_description = 'Unpublish selected items'
