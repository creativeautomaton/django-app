import os
# import django_heroku
import dj_database_url
import stripe
import boto3
import shlex, subprocess, shutil

# stripe.api_key = 'sk_test_SVYejUhpTGEABCVpFhZJS10X00WpmP3A2w'
# stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')


# stripe.Customer.create(
#   description="Customer for jenny.rosen@example.com",
# )
# stripe.Charge.create(
#   amount=2100,
#   currency="usd",
#   source="tok_amex",
#   description="Charge for mister.test@example.com",
# )


# Stripe Key Settings
# STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
# STRIPE_PUBLISHABLE_KEY = os.environ.get('STRIPE_PUBLISHABLE_KEY')


# Current Subscription Price
SUBSCRIPTION_PRICE = 1500

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# Override this in local_settings.py
SECRET_KEY = 'ui7pf@bh&+40ilc_h$j_f3(!%c&1hwu%sng36yus&&16edgp+2'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1', 'localhost',
'lds0kwfx36.execute-api.us-east-2.amazonaws.com','revabot.online', 'www.revabot.online', ]

# Application definition

INSTALLED_APPS = [
    'api.apps.ApiConfig',
    'countries.apps.CountriesConfig',
    'users.apps.UsersConfig',
    'trips.apps.TripsConfig',
    'rest_framework',
    'corsheaders',
    'rest_framework.authtoken',
    'rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'rest_auth.registration',
    'storages',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "djstripe",
    'django_s3_storage',
    'boto3',
]

AUTH_USER_MODEL = 'users.User'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'djstripe.middleware.SubscriptionPaymentMiddleware',
]

# djstripe pages are automatically exempt!
# DJSTRIPE_SUBSCRIPTION_REQUIRED_EXCEPTION_URLS = (
#     'home',
#     'profile'
#     'about',
#     "[spam]",  # Anything in the dj-spam namespace
# )

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, "frontend/build"),
            # os.path.join(BASE_DIR, "/frontend/build/")
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

#React functions
REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend')
# REACT_APP_API_URL_DEV='http://localhost:8000'
REACT_APP_API_URL = '/'
# REACT_APP_API_URL = 'http://localhost:8000'
NODE_ENV = 'development'

#Remove React Build folder
REACT_BUILD_FOLDER = os.path.join(REACT_APP_DIR, 'build')
# shutil.rmtree(REACT_BUILD_FOLDER, ignore_errors=True)
# subprocess.Popen(["cd frontend/ && npm run build"], shell=True)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
STATIC_URL = '/static/'
# print(BASE_DIR + '/frontend/build/')
STATICFILES_DIRS = [
    # os.path.join(BASE_DIR, 'frontend/public'),
    os.path.join('frontend/build/'),
    os.path.join('static/'),
    os.path.join(REACT_APP_DIR, 'build', 'static'),
]
CORS_ORIGIN_ALLOW_ALL = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'api.serializers.UserDetailSerializer',
}

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'api.serializers.RegistrationSerializer'
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

SITE_ID = 1

ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_AUTHENTICATION_METHON = 'username'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASS')

# Heroku settings get overridden if local_settings.py exists.
# django_heroku.settings(locals())
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'revabot-dev-database-1.cbczc4bx4ffl.us-east-2.rds.amazonaws.com',
        'PORT': '5432',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'postgres',
#         'USER': 'postgres',
#         'PASSWORD': '',
#         'HOST': 'db',
#         'PORT': '5432',
#     }
# }

SECRET_KEY = 'your secret django key'
EMAIL_USER = 'your email username'
EMAIL_PASS = 'your gmail app password'

ROOT_URLCONF = 'backend.urls'
# DATABASES['default'] = dj_database_url.config()

STRIPE_LIVE_PUBLIC_KEY = os.environ.get("STRIPE_LIVE_PUBLIC_KEY", "<your publishable key>")
STRIPE_LIVE_SECRET_KEY = os.environ.get("STRIPE_LIVE_SECRET_KEY", "<your secret key>")
STRIPE_TEST_PUBLIC_KEY = os.environ.get("STRIPE_TEST_PUBLIC_KEY", "STRIPE_PUBLISHABLE_KEY")
STRIPE_TEST_SECRET_KEY = os.environ.get("STRIPE_TEST_SECRET_KEY", "sk_test_SVYejUhpTGEABCVpFhZJS10X00WpmP3A2w")
STRIPE_LIVE_MODE = False  # Change to True in production
DJSTRIPE_WEBHOOK_SECRET = "whsec_xxx"  # Get it from the section in the Stripe dashboard where you added the webhook endpoint

STRIPE_API_VERSION = '2019-09-09'
# Get it from the section in the Stripe dashboard where you added the webhook endpoint looks like whsec_xxx

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")

s3 = boto3.resource(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

AWS_STORAGE_BUCKET_NAME = "revabot-zappa-library"
AWS_DEFAULT_ACL = None

AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
# CloudFront  on AWS
# If you’re using S3 as a CDN (via CloudFront),
# you’ll probably want this storage to serve those files using that:
#  here is an example
# AWS_S3_CUSTOM_DOMAIN = 'cdn.mydomain.com'
# AWS_S3_CUSTOM_DOMAIN = 'd27uxkp9q22c9z.cloudfront.net'

# WARNING
# Django’s STATIC_URL must end in a
# slash and the AWS_S3_CUSTOM_DOMAIN must not.
# It is best to set this variable indepedently of STATIC_URL.
# DEFAULT_FILE_STORAGE = "django_s3_storage.storage.S3Storage"
# YOUR_S3_BUCKET = "revabot-zappa-library"
# AWS_STORAGE_BUCKET_NAME = "revabot-zappa-library"
# AWS_DEFAULT_ACL = None

# How to construct S3 URLs ("auto", "path", "virtual").
# AWS_S3_ADDRESSING_STYLE = "auto"
#
# old staticfile setting
# STATICFILES_STORAGE = "django_s3_storage.storage.StaticS3Storage"
# STATICFILES_STORAGE = "django_s3_storage.storage.ManifestStaticS3Storage"
# AWS_S3_BUCKET_NAME_STATIC = YOUR_S3_BUCKET
#
# # These next two lines will serve the static files directly
# # from the s3 bucket
# AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % YOUR_S3_BUCKET
# STATIC_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN

# OR...if you create a fancy custom domain for your static files use:
#AWS_S3_PUBLIC_URL_STATIC = "https://static.zappaguide.com/"


# Travis ci database settings.
if 'TRAVIS' in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'travis_ci_test',
            'USER': 'postgres',
            'PASSWORD': '',
            'HOST': 'localhost',
            'PORT': '',
        }
    }

if 'SERVERTYPE' in os.environ and os.environ['SERVERTYPE'] == 'AWS Lambda':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'postgres',
            'USER': 'postgres',
            'PASSWORD': 'postgres',
            'HOST': 'revabot-dev-database-1.cbczc4bx4ffl.us-east-2.rds.amazonaws.com',
            'PORT': '5432',
        }
    }
else :
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'postgres',
            'USER': 'postgres',
            'PASSWORD': '',
            'HOST': 'db',
            'PORT': '5432',
        }
    }
    SECRET_KEY = 'your secret django key'
    EMAIL_USER = 'your email username'
    EMAIL_PASS = 'your gmail app password'

# Local settings.
try:
    from backend.local_settings import *
except ImportError:
    pass
