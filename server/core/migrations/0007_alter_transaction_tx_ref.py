# Generated by Django 5.1.6 on 2025-02-21 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_transaction_transaction_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='tx_ref',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
