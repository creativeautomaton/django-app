# Generated by Django 2.1.2 on 2018-11-11 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tripreport',
            name='countries',
            field=models.ManyToManyField(related_name='trip_countries', to='countries.Country'),
        ),
    ]