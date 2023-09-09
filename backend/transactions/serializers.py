from rest_framework import serializers
from .models import Transaction
from django.utils import timezone

class TransactionSerializer(serializers.Serializer):
    TRANSACTION_TYPES = [
        ('CREDIT', 'Credit'),
        ('DEBIT', 'Debit'),
    ]

    account_number = serializers.ReadOnlyField(source='account.account_number') 

    transaction_type = serializers.ChoiceField(choices=TRANSACTION_TYPES)
    note = serializers.CharField(allow_blank=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    date = serializers.DateTimeField(default=timezone.now)

    def create(self, validated_data):
        return Transaction.objects.create(**validated_data)