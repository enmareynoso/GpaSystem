from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
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
            # Create the account
            account = serializer.save(user=user)
            
            # Set Balance to current_balance
            account.Balance = account.current_balance
            account.save()
            
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
    
class DeleteAccountView(APIView):
    def delete(self, request, account_number):
    
        user, response = get_authenticated_user(request)
        if not user:
            return response  

        try:
            account = Account.objects.get(account_number=account_number)
        except Account.DoesNotExist:
            return Response({"detail": "Account not found"}, status=status.HTTP_404_NOT_FOUND)

        if account.user != user:
            return Response({"detail": "You are not the owner of this account"}, status=status.HTTP_403_FORBIDDEN)

        
        account.delete()

        return Response({"detail": "Account deleted successfully"}, status=status.HTTP_204_NO_CONTENT)