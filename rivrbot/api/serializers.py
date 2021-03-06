from collections import OrderedDict
from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from countries.models import Country, Currency, Language, RegionalBloc
from users.models import User
from trips.models import TripReport

import stripe
from djstripe.models.core import Customer
from djstripe.enums import SubscriptionStatus
from djstripe.models import Plan, Subscription


class CustomerSerializer(serializers.ModelSerializer):
    '''
    Stripe Customer serializer inherited from ModelSerializer.
    '''
    class Meta:
        model = Customer
        fields = (
            "id",
            "subscriber",
            "email",
            "currency",
            "default_source",
            "coupon",
            "balance",
            "business_vat_id"
         )

class SubscriptionSerializer(serializers.ModelSerializer):
    '''
    Stripe Customer serializer inherited from ModelSerializer.
    '''
    class Meta:
        model = Subscription
        fields = ('__all__')


class UserStripePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'product')


class CurrenciesSerializer(serializers.ModelSerializer):
    '''
    Currency serializer inherited from ModelSerializer.
    '''
    class Meta:
        model = Currency
        fields = ('code', 'name', 'symbol')


class LanguagesSerializer(serializers.ModelSerializer):
    '''
    Languages serializer inherited from ModelSerializer.
    '''
    class Meta:
        model = Language
        fields = ('iso639_1', 'name', 'native_name')


class RegionalBlocsSerializer(serializers.ModelSerializer):
    '''
    RegionalBloc serializer inherited from ModelSerializer.
    '''
    class Meta:
        model = RegionalBloc
        fields = ('acronym', 'name', 'other_acronyms', 'other_names')


class CountryRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('pk',)


class CountrySerializer(serializers.ModelSerializer):
    '''
    The currencies, languages, and regional_bloc fields are made up of the
    corresponding models. In the API, their data will also be available. This
    serializer is used on the Country API View.
    '''
    currencies = CurrenciesSerializer(many=True)
    languages = LanguagesSerializer(many=True)
    regional_blocs = RegionalBlocsSerializer(many=True)

    class Meta:
        model = Country
        fields = ('__all__')


class CountryField(serializers.PrimaryKeyRelatedField):
    '''
    This serializer allows GET requests to return the full nested Country
    object, but use the pk for POST/PUT/PATCH requests. This serializer is used
    with the Trip Report and User Detail serializers to simplify handling
    requests from the frontend. This serializer is used on the User & Trip
    Report Views. This makes POST & PUT requests from the frontend easy to
    maintain, e.g. the pk can be stored as the value of an option on a select
    form, instead of having to store the entire country object.
    '''

    def to_representation(self, value):
        pk = super(CountryField, self).to_representation(value)
        try:
            item = Country.objects.get(pk=pk)
            serializer = CountrySerializer(item)
            return serializer.data
        except Country.DoesNotExist:
            return None

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            return {}

        return OrderedDict([(item.id, str(item)) for item in queryset])


class AuthorField(serializers.PrimaryKeyRelatedField):
    '''
    Same as the Country Field serializer, GET requests return User object, but
    POST/PUT/PATCH requests only require the pk of the user.
    '''

    def to_representation(self, value):
        pk = super(AuthorField, self).to_representation(value)
        try:
            item = User.objects.get(pk=pk)
            serializer = UserDetailSerializer(item)
            return serializer.data
        except User.DoesNotExist:
            return None

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            return {}

        return OrderedDict([(item.id, str(item)) for item in queryset])


class UserSerializer(serializers.ModelSerializer):
    '''
    This is a serializer used to list all of the Users. Users will be filtered
    in the View, and the frontend can make GET requests to view user profiles.
    '''
    countries = CountryField(queryset=Country.objects.all(), many=True)
    home = CountryField(queryset=Country.objects.all())

    class Meta:
        model = User
        fields = ('pk', 'username', 'countries', 'home', 'biography', 'street','state', 'zipcode')


class TripReportSerializer(serializers.ModelSerializer):
    '''
    The Trip Report serializer uses the AuthorField and CountryField
    serializers that allows Trip Reports to be posted and updated on the
    frontend with just the pks for these fields. The pk values are easily
    stored in a select input on the frontend.
    '''
    author = AuthorField(queryset=User.objects.all())
    countries = CountryField(queryset=Country.objects.all(), many=True)
    favoriters = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all(), many=True)

    class Meta:
        model = TripReport
        fields = ('__all__')


class UserDetailSerializer(UserDetailsSerializer):
    '''
    Custom serializer for the /rest-auth/user/ User Details Serializer.
    '''
    countries = CountryField(queryset=Country.objects.all(), many=True)
    home = CountryField(queryset=Country.objects.all())

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'countries', 'home', 'biography', 'street', 'state', 'zipcode')

    '''
    Updates the users object in the database. The username, email, countries,
    and home are set by a PUT request from the frontend.
    '''

    def update(self, instance, validated_data):
        instance.username = validated_data['username']
        instance.email = validated_data['email']
        instance.street = validated_data['street']
        instance.state = validated_data['state']
        instance.zipcode = validated_data['zipcode']
        # Direct assignment of ManyToMany objects prohibited, use .set()
        instance.countries.set(validated_data['countries'])
        instance.home = validated_data['home']
        instance.biography = validated_data['biography']
        instance.save()
        return instance


class RegistrationSerializer(RegisterSerializer):
    '''
    Custom Registration Serializer used to include required home country field.
    '''
    username = serializers.CharField(required=True, write_only=True)
    email = serializers.EmailField(required=True, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)
    home = CountryField(queryset=Country.objects.all(), required=True, write_only=True)
    street = serializers.CharField(write_only=True, allow_blank=True)
    state = serializers.CharField(write_only=True, allow_blank=True)
    zipcode = serializers.CharField(write_only=True, allow_blank=True)


    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'home': self.validated_data.get('home', ''),
            'street': self.validated_data.get('street', ''),
            'state': self.validated_data.get('state', ''),
            'zipcode': self.validated_data.get('zipcode', ''),
        }

    '''
    As per the Allauth documents, Registration Serializer must include save
    function that returns user instance.
    '''

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        # setup_user_stripe_account(request, user, [])
        user.home = self.cleaned_data.get('home')
        user.street = self.cleaned_data.get('street')
        user.state = self.cleaned_data.get('state')
        user.zipcode = self.cleaned_data.get('zipcode') 
        user.save()
        return user

        # Create the stripe Customer, by default subscriber Model is User,
        # this can be overridden with settings.DJSTRIPE_SUBSCRIBER_MODEL
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

    def form_valid(self, form):
        stripe_source = form.cleaned_data["stripe_source"]
        email = form.cleaned_data["email"]
        plan = form.cleaned_data["plan"]

        # Guest checkout with the provided email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = User.objects.create(username=email, email=email)

        # Create the stripe Customer, by default subscriber Model is User,
        # this can be overridden with settings.DJSTRIPE_SUBSCRIBER_MODEL
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

        self.request.subscription = subscription

        return super().form_valid(form)
