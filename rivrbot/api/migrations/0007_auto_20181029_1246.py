# Generated by Django 2.1.2 on 2018-10-29 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20181029_1231'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='regionalBlocs',
            field=models.ManyToManyField(blank=True, to='api.RegionalBloc'),
        ),
    ]