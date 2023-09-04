from django.http import JsonResponse
from rest_framework import status
import jwt
import os
from users.models import User
from dotenv import load_dotenv, dotenv_values
load_dotenv()
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')


def get_authenticated_user(request):
    token = request.COOKIES.get('jwt')

    if not token:
        return None, JsonResponse(
            {"detail": "Authentication credentials were not provided."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None, JsonResponse(
            {"detail": "Unauthenticated"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    user = User.objects.filter(id=payload['id']).first()
    if user is None:
        return None, JsonResponse(
            {"detail": "User not found"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return user, None