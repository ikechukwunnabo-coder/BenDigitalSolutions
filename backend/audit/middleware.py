from .models import AuditLog


class AuditMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        try:
            user = getattr(request, 'user', None)
            if not (user and user.is_authenticated):
                return response
            path = request.path or ''
            method = request.method
            should_log = (
                path.startswith('/admin/')
                or (path.startswith('/api/') and method in ('POST', 'PUT', 'PATCH', 'DELETE') and not path.startswith('/api/auth/csrf'))
            )
            if should_log:
                AuditLog.objects.create(
                    actor=user,
                    action=f"{method} {path}",
                    ip_address=self.get_client_ip(request),
                    user_agent=(request.META.get('HTTP_USER_AGENT', '') or '')[:1000],
                )
        except Exception:
            pass
        return response

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR')
