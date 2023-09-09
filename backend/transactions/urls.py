from django.urls import path
from .views import TransactionCreate, TransactionList, BalanceView

urlpatterns = [
    path('transactions/create/', TransactionCreate.as_view(), name='transaction-create'),
    path('accounts/transactions/', TransactionList.as_view(), name='transaction-list'),
    path('accounts/balance/', BalanceView.as_view(), name='account-balance'),
]
