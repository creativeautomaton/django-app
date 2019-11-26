from django.db import models
from django.contrib.auth.models import AbstractUser
from countries.models import Country
from django.db import transaction

from djstripe import webhooks 
from django.utils.functional import cached_property
from djstripe.utils import subscriber_has_active_subscription

# def do_something():
#     pass  # send a mail, invalidate a cache, fire off a Celery task, etc.
#
# @webhooks.handler("plan", "product")
# def my_handler(event, **kwargs):
#     transaction.on_commit(do_something)

class User(AbstractUser):
    '''
    Custom User model. Countries is a list of countries associated with the
    user. Home country is a single country object
    '''
    countries = models.ManyToManyField(
        Country, blank=True, related_name='user_countries'
    )
    home = models.ForeignKey(
        Country, on_delete=models.PROTECT, null=True,
        related_name='home_country'
    )
    biography = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return self.username

    @cached_property
    def has_active_subscription(self):
        """Checks if a user has an active subscription."""
        return subscriber_has_active_subscription(self)
