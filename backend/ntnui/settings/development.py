import logging
from datetime import timedelta

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.utils import BadDsn

from .base import *

""" GENERAL """
SECRET_KEY = os.environ.get("NTNUI_SECRET_KEY")
DEBUG = False
PRODUCTION = True
ENVIRONMENT = EnvironmentOptions.DEVELOPMENT

""" ACCESS CONTROL """
ALLOWED_HOSTS = ["dev.medlem.ntnui.no", "dev.api.ntnui.no"]

CORS_ORIGIN_ALLOW_ALL = True

CORS_ORIGIN_WHITELIST = (
    "https://dev.medlem.ntnui.no",
    "https://dev.api.ntnui.no",
)

""" EMAIL """
EMAIL_HOST = os.environ.get("MAILGUN_HOST")
EMAIL_PORT = os.environ.get("MAILGUN_PORT")
EMAIL_HOST_USER = os.environ.get("MAILGUN_LOGIN")
EMAIL_HOST_PASSWORD = os.environ.get("MAILGUN_PASSWORD")
EMAIL_USE_TLS = True

""" STATIC FILES """
STATIC_ROOT = os.environ.get("NTNUI_STATIC_PATH")
MEDIA_ROOT = os.environ.get("NTNUI_MEDIA_PATH")

""" SENTRY CONFIGURATION """
try:
    sentry_sdk.init(
        dsn=os.environ.get("SENTRY_KEY"), environment="staging", integrations=[DjangoIntegration()]
    )
except BadDsn as e:
    logging.warning(e)

# THIS MUST BE HERE TO SET THE RIGHT SECRET_KEY
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "USER_ID_FIELD": "ntnui_no",
    "USER_ID_CLAIM": "ntnui_no",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}
