from django.conf import settings

from ntnui.enums import EnvironmentOptions


def requires_prod(func):
    def execute_if_prod(*args, **kwargs):
        if settings.ENVIRONMENT == EnvironmentOptions.PRODUCTION:
            func(*args, **kwargs)

    return execute_if_prod
