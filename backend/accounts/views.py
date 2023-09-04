from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account
from .serializers import AccountSerializer
import os
import jwt, datetime
from gpasystem.utils.auth import get_authenticated_user
from dotenv import load_dotenv, dotenv_values

load_dotenv()
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')



class CreateAccountView(APIView):
    def post(self, request):
        user, response = get_authenticated_user(request)
        if response:
            return response
        
        serializer = AccountSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ListAccountsView(APIView):
    def get(self, request):
        user, response = get_authenticated_user(request)
        if response:
            return response
        
        accounts = Account.objects.filter(user=user)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)