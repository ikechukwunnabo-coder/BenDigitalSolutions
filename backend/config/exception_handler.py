from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.response import Response
from rest_framework import status


def exception_handler(exc, context):
    response = drf_exception_handler(exc, context)
    if response is not None:
        # Normalize error payload while preserving DRF details
        data = response.data
        if isinstance(data, dict) and 'detail' in data and len(data) == 1:
            errors = {'detail': data['detail']}
        else:
            errors = data
        response.data = {'status': 'error', 'message': 'Request failed', 'errors': errors}
        return response
    return Response({'status': 'error', 'message': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
