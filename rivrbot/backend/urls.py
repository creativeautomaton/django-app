from django.contrib import admin
from django.urls import path, re_path, include
from django.conf.urls import url
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import djstripe
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('', include('django.contrib.auth.urls')),
    # path('.*', TemplateView.as_view(template_name='index.html')),
    # path('.*', TemplateView.as_view(template_name='index.html')),
    # path('', TemplateView.as_view(template_name='index.html')),
     # must be catch-all for pushState to work
    path('', views.FrontendAppView.as_view()),
]
