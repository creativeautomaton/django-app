from django.shortcuts import get_object_or_404
from django.views.generic import DetailView, FormView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import viewsets, filters
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count
from api.serializers import (
    CountrySerializer,
    TripReportSerializer,
    UserSerializer,
    CustomerSerializer,
    SubscriptionSerializer
)
from djstripe.models.core import Customer
from djstripe.enums import SubscriptionStatus
from djstripe.models import Plan, Subscription

from countries.models import Country
from trips.models import TripReport
from users.models import User
import djstripe
import stripe


class TripReportSetPagination(PageNumberPagination):
    '''
    This sets pagination for the Trip Reports api view. No pagination is used
    for the Country API view because the max array size return from a GET
    request will be 250 Country objects, but the Trip Reports API will continue
    to grow.
    '''
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3


class CountryListView(ListAPIView):
    '''
    This is the api view for all of the countries and territories represented
    in the Country model. This model can be filtered with search, using the
    fields listed in search_fields.
    '''
    queryset = Country.objects.all().order_by('name')
    serializer_class = CountrySerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'demonym', 'alpha3code', 'languages__name')

class StripeViewSet(viewsets.ModelViewSet):
    '''
    When GET requests are made to this view, the user, who made the request,
    has their ManyToMany relation toggled in the djstripe model. The GET request
    returns the Trip Report object with the updated favoriters array.
    '''
    queryset = Customer.objects.all().annotate(
        count=Count('subscriber')).order_by('-count')
    serializer_class = CustomerSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('=id', )
    ordering_fields = ('pk', )


class StripeSubscriptionViewSet(viewsets.ModelViewSet):

    queryset = Subscription.objects.all()
    # queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    # stripe_data = stripe.Product.create(
    #    api_key=djstripe.settings.STRIPE_SECRET_KEY,
    #    name="Monthly membership base fee test",
    #    type="service",
    # )

    def get(self, request):


        djstripe_obj = djstripe.models.Product.sync_from_stripe_data(stripe_data)
        # djstripe_sync_models
        return djstripe_obj



class StripeChargeTest(viewsets.ModelViewSet):

    # sync_from_stripe_data to save it to the database,
    # and recursively update any referenced objects
    # permission_classes = (permissions.IsAuthenticated)
    # serializer_class = SubscriptionSerializer
    # stripe_data = stripe.Product.create(
    #    api_key=djstripe.settings.STRIPE_SECRET_KEY,
    #    name="Monthly membership base fee test",
    #    type="service",
    # )
    # queryset = stripe_data

    def get(self, request):
        stripe = get_object_or_404(Stripe, pk=pk)

        # stripe API return value is a dict-like object
        return stripe_data
        # sync_from_stripe_data to save it to the database,
        # and recursively update any referenced objects
        # djstripe_obj = djstripe.models.Product.sync_from_stripe_data(stripe_data)
        # djstripe_sync_models
        # return djstripe_obj



class PurchaseSubscriptionView(viewsets.ModelViewSet):

      queryset = User.objects.all()
      serializer_class = UserSerializer

      # Create the stripe Customer, by default subscriber Model is User,
      # this can be overridden with settings.DJSTRIPE_SUBSCRIBER_MODEL
      permission_classes = (permissions.IsAuthenticated,)

      def get(self, request, slug=None, format=None, pk=None):
          # obj = get_object_or_404(TripReport, id=pk)
          user = self.request.user
          if user.is_authenticated:
              customer, created = djstripe.models.Customer.get_or_create(subscriber=user)

              # Add the source as the customer's default card
              customer.add_card(stripe_source)

              # Using the Stripe API, create a subscription for this customer,
              # using the customer's default payment source
              stripe_subscription = stripe.Subscription.create(
                  customer=customer.id,
                  items=[{"plan": plan.id}],
                  billing="charge_automatically",
                  # tax_percent=15,
                  api_key=djstripe.settings.STRIPE_SECRET_KEY,
              )

              # Sync the Stripe API return data to the database,
              # this way we don't need to wait for a webhook-triggered sync
              subscription = djstripe.models.Subscription.sync_from_stripe_data(
                  stripe_subscription
              )
        # permission_classes = (permissions.IsAuthenticated,)
        #
        # def get(self, request, slug=None, format=None, pk=None):
        #     obj = get_object_or_404(TripReport, id=pk)
        #     user = self.request.user
        #     if user.is_authenticated:
        #         if user in obj.favoriters.all():
        #             obj.favoriters.remove(user)
        #         else:
        #             obj.favoriters.add(user)
        #     serializer = TripReportSerializer(obj)
        #     return Response(serializer.data)

class TripReportViewSet(viewsets.ModelViewSet):
    '''
    This is the viewset for Trip Reports. The queryset ordering defaults to
    count of users who have favorited a post, but this behavior can be
    overridden. Search fields allow users to filter the trip reports by authors
    or users on the frontend. The slug is used to filter for a specific post.
    '''
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = TripReportSerializer
    pagination_class = TripReportSetPagination
    # To order by favorite count or 'top':
    queryset = TripReport.objects.all().annotate(
        count=Count('favoriters')).order_by('-count')
    # queryset = TripReport.objects.all().order_by('-pk')
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('=author__username', '=slug', 'countries__name', )
    ordering_fields = ('pk', )


class UserListView(ListAPIView):
    '''
    A simple ListAPIView to list all of the users.
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('=username', )


class FavoriteAPI(APIView):
    '''
    When GET requests are made to this view, the user, who made the request,
    has their ManyToMany relation toggled in the favoriter field of the Trip
    Report model. The GET request returns the Trip Report object with the
    updated favoriters array.
    '''
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, slug=None, format=None, pk=None):
        obj = get_object_or_404(TripReport, id=pk)
        user = self.request.user
        if user.is_authenticated:
            if user in obj.favoriters.all():
                obj.favoriters.remove(user)
            else:
                obj.favoriters.add(user)
        serializer = TripReportSerializer(obj)
        return Response(serializer.data)
