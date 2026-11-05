from rest_framework import viewsets, permissions
from .models import PortfolioItem
from .serializers import PortfolioItemSerializer


class PortfolioViewSet(viewsets.ModelViewSet):
    serializer_class = PortfolioItemSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return PortfolioItem.objects.all()
        return PortfolioItem.objects.filter(is_published=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), permissions.IsAdminUser()]
