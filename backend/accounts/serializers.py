import random
from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    current_balance = serializers.DecimalField(max_digits=10, decimal_places=2)
    account_number = serializers.CharField(read_only=True)

    class Meta:
        model = Account
        fields = ('account_number','current_balance', 'user')

    def create(self, validated_data):
        account_number = self.generate_account_number()
        validated_data['account_number'] = account_number
        return super().create(validated_data)

    def generate_account_number(self):
        while True:
            random_numbers = [f"{random.randint(0, 9999):04d}" for _ in range(4)]
            account_number = " ".join(random_numbers)
            if not Account.objects.filter(account_number=account_number).exists():
                return account_number

# class AccountDeleteSerializer(serializers.Serializer):
#     id = serializers.IntegerField()

#     def validate_id(self, value):
#         try:
#             account = Account.objects.get(id=value)
#         except Account.DoesNotExist:
#             raise serializers.ValidationError("Account not found")

#         user = self.context['request'].user
#         if account.user != user:
#             raise serializers.ValidationError("You are not the owner of this account")

#         return {'account': account}