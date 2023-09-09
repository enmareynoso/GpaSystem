# Generated by Django 4.2.4 on 2023-09-07 18:09

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="account",
            name="starting_balance",
            field=models.DecimalField(
                decimal_places=2, default=Decimal("0.00"), max_digits=10
            ),
        ),
        migrations.AlterField(
            model_name="account",
            name="current_balance",
            field=models.DecimalField(
                decimal_places=2, default=Decimal("0.00"), max_digits=10
            ),
        ),
    ]
