from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from crm.views import submit_enquiry
from .views import dashboard_summary, health

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health),
    path('api/enquiries/', submit_enquiry),
    path('api/dashboard/summary/', dashboard_summary),
    path('api/services/', include('services.urls')),
    path('api/customers/', include('customers.urls')),
    path('api/crm/', include('crm.urls')),
    path('api/portfolio/', include('portfolio.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/audit/', include('audit.urls')),
    path('api/auth/', include('accounts.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
