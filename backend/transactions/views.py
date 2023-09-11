from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Transaction
from users.models import User
from accounts.models import Account
from .serializers import TransactionSerializer
from datetime import date, datetime, time
from gpasystem.utils.auth import get_authenticated_user
from accounts.models import Account
from django.utils import timezone
import pytz
from decimal import Decimal 
from django.http import JsonResponse
from django.db.models import Sum, F

class TransactionCreate(APIView):
    def post(self, request, format=None):
        user, response = get_authenticated_user(request)
        if not user:
            return response  

        # Determine the account associated with the transaction based on the account_id
        account_id = request.data.get('account_id')
        account_number = request.data.get('account_number')
        try:
            # Retrieve the account associated with the user and account_id
            account = Account.objects.get(id=account_id, user=user)
        except Account.DoesNotExist:
            return Response({'error': 'Account not found or not authorized.'}, status=status.HTTP_404_NOT_FOUND)

       
        local_timezone = pytz.timezone('Etc/GMT+4')
        local_datetime = datetime.now(local_timezone)


        # Create a Transaction instance and set its date field to the current date and time in the local timezone
        transaction = Transaction(account=account, **request.data)
        transaction.date = local_datetime

        transaction_type = transaction.transaction_type
        amount = transaction.amount

        if transaction_type.upper() == 'CREDIT':
            account.current_balance += Decimal(amount)
        elif transaction_type.upper() == 'DEBIT':
            account.current_balance -= Decimal(amount)
            if account.current_balance < 0:
                return Response({'error': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)

       
        account.save()
        transaction.save()

        serializer = TransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class TransactionList(APIView):
    def get(self, request, format=None):
        user, response = get_authenticated_user(request)
        if not user:
            return response  

        # Get a list of account IDs associated with the authenticated user
        account_ids = Account.objects.filter(user=user).values_list('id', flat=True)

        if not account_ids:
            # No user accounts found
            return Response({'error': 'User has no accounts.'}, status=status.HTTP_404_NOT_FOUND)

        # Filter the transactions related to the user's accounts
        transactions = Transaction.objects.filter(account_id__in=account_ids).prefetch_related('account')

        if not transactions:
            return Response({'message': 'No transactions found for user accounts.'}, status=status.HTTP_204_NO_CONTENT)

        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    



class BalanceView(APIView):
    def get(self, request):
        user, response = get_authenticated_user(request)
        if not user:
            return response  

        try:
           
            date_str = self.request.query_params.get('date')
            target_date = timezone.datetime.strptime(date_str, '%Y-%m-%d')  #timezone-aware

            start_timestamp = timezone.make_aware(timezone.datetime.combine(target_date, timezone.datetime.min.time()))
            end_timestamp = timezone.make_aware(timezone.datetime.combine(target_date, timezone.datetime.max.time()))

          
            transactions = Transaction.objects.filter(
                account__user=user,
                date__range=(start_timestamp, end_timestamp)
            ).order_by('date')

            # Initialize movements list
            movements_list = []

            account_current_balances = {}  # For maintaining current_balance for each account

            for transaction in transactions:
                transaction_type = transaction.transaction_type
                note = transaction.note
                amount = transaction.amount

                # Get account associated with the transaction
                account = transaction.account

                # If the account is not in the account_current_balances dict, initialize it
                if account not in account_current_balances:
                    account_current_balances[account] = account.Balance  

                # Calculate the new balance based on the transaction type
                current_balance = account_current_balances[account]

                if transaction_type.upper() == 'CREDIT':
                    current_balance += amount
                elif transaction_type.upper() == 'DEBIT':
                    current_balance -= amount

                # Update the balance
                account_current_balances[account] = current_balance

                # Build movement entry for the account
                movement = {
                    'Date': timezone.localtime(transaction.date).strftime('%Y-%m-%d'),  
                    'Account_Number': account.account_number,
                    'Transaction_Type': transaction_type,
                    'Note': note,
                    'Amount': amount,
                    'Balance': '{:.2f}'.format(current_balance),
                }
                movements_list.append(movement)

            return JsonResponse({'movements_list': movements_list})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)