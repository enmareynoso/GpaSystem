from django.db import models
from users.models import User  
# Create your models here.


class Account(models.Model):
    account_number = models.CharField(max_length=20, unique=True)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # One-to-Many relationship with User

    def __str__(self):
        return self.account_number