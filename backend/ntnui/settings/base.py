import os
import sys

from ntnui.enums import EnvironmentOptions

SECRET_KEY = None
DEBUG = True
PRODUCTION = False
ENVIRONMENT = EnvironmentOptions.BASE

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(BASE_DIR, "../ntnui/apps"))
APP_DIR = os.path.join(BASE_DIR, "../ntnui/apps")

""" APP CONFIGURATION """
DJANGO_APPS = [
    # Default Django Apps
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Admin panel
    "django.contrib.admin",
]

THIRD_PARTY_APPS = [
    # Django REST
    "rest_framework",
    # CORS
    "corsheaders",
    # Nested Inlines (admin)
    "nested_admin",
    "rules",
    # Imagekit
    "imagekit",
    # Extensions
    "drf_yasg",
    # django-phonenumber-field
    "phonenumber_field",
    "django.contrib.postgres",
]

LOCAL_APPS = [
    "groups.apps.GroupsConfig",
    "accounts.apps.AccountsConfig",
    "payments.apps.PaymentsConfig",
    "koie_booking.apps.KoieBookingConfig",
    "koiene_report.apps.KoieneReportConfig"
]

INSTALLED_APPS = LOCAL_APPS + THIRD_PARTY_APPS + DJANGO_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "ntnui.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": (
            # It is important that we load the base templates first
            os.path.join(BASE_DIR, "./static", "templates"),
            # Load app templates
            os.path.join(APP_DIR, "groups", "templates"),
            os.path.join(APP_DIR, "accounts", "templates"),
            os.path.join(APP_DIR, "koie_booking", "templates"),
        ),
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "wsgi.application"

""" AUTHENTICATION CONFIGURATION """
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",},
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {"min_length": 8,},
    },
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]

AUTH_USER_MODEL = "accounts.UserModel"

AUTHENTICATION_BACKENDS = (
    "rules.permissions.ObjectPermissionBackend",
    "django.contrib.auth.backends.ModelBackend",
)

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "CET"

USE_I18N = True

USE_L10N = True

USE_TZ = True

""" STATIC FILE CONFIGURATION """
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]

STATIC_URL = "/static/"
MEDIA_URL = "/media/"

MEDIA_ROOT = os.path.join(BASE_DIR, "ntnui/media")

""" MESSAGE STORAGE CONFIGURATION """
MESSAGE_STORAGE = "django.contrib.messages.storage.cookie.CookieStorage"

""" DATABASE CONFIGURATION """
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("POSTGRES_DB"),
        "USER": os.environ.get("POSTGRES_USER"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD"),
        "HOST": os.environ.get("POSTGRES_HOST"),
        "PORT": os.environ.get("POSTGRES_PORT"),
    }
}

""" REST CONFIGURATION """
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticatedOrReadOnly",],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 50,
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema"
    # 'DEFAULT_RENDERER_CLASSES': [
    #     #'rest_framework.renderers.JSONRenderer',
    # ]
}

PHONENUMBER_DB_FORMAT = "E164"
PHONENUMBER_DEFAULT_REGION = "NO"


