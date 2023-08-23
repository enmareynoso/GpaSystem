from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import user_serializer
from .models import User
from django.utils import timezone
import jwt, datetime
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')


# Create your views here.


class Register(APIView):
    def post(self, request):
        serializer = user_serializer(data=request.data)
        # validating serializer
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class Login(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed("User not found!")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")

        # FIX: "datetime.datetime not JSON serializable"
        expiration_time = timezone.now() + datetime.timedelta(minutes=60)
        expiration_iso = expiration_time.isoformat()
        issued_iso = timezone.now().isoformat()

        payload = {
            "id": user.id, 
            "expiration": expiration_iso, 
            "issued_at": issued_iso
        }

        token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")


        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        
        response.data = {
            'jwt': token,
        }

        return response

class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('User unauthenticated')
        
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms="HS256")
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer =  user_serializer(user)
            
        return Response(serializer.data)


class Logout(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message": "cookie deleted successfully"
        }

        return response 