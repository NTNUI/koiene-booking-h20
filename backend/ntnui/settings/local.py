from datetime import timedelta

from .base import *

""" GENERAL """
SECRET_KEY = os.environ.get(
    "NTNUI_SECRET_KEY", "This is a random secret key, used for local development only"
)
ENVIRONMENT = EnvironmentOptions.LOCAL

""" ACCESS CONTROL """
ALLOWED_HOSTS = ["*"]
CORS_ORIGIN_ALLOW_ALL = True

""" EMAIL """
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

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
