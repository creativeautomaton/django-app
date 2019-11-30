from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CountryListView, TripReportViewSet,
    UserListView, FavoriteAPI,
    StripeViewSet,
    StripeChargeTest,
    StripeSubscriptionViewSet
)

router = DefaultRouter()
router.register(r'reports', TripReportViewSet, base_name='trip_report')
router.register(r'stripe', StripeViewSet, base_name='stripe')
router.register(r'subscription', StripeSubscriptionViewSet, base_name='stripe_subscription')


urlpatterns = [
    path('countries/', CountryListView.as_view()),
    path('users/', UserListView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('reports/<int:pk>/favorite/', FavoriteAPI.as_view()),
    # path(r"^stripe/", include("djstripe.urls", namespace="djstripe")),


    # path('stripe/test/', StripeSubscriptionViewSet.as_view() ),

    # path('customer/', CustomerListView.as_view()),
    # path('subscriptions/form/', PurchaseSubscriptionView.as_view() ),
]

urlpatterns += router.urls
