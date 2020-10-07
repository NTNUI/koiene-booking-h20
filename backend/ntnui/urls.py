from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from django.contrib import admin
from django.contrib.auth.models import Group

""" Configure Admin """
# admin.site.unregister(Group)

schema_view = get_schema_view(
    openapi.Info(
        title="NTNUI API",
        default_version="v1",
        description="Documentation for medlem.ntnui.no",
        contact=openapi.Contact(email="sprint@ntnui.no"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


""" Include URL Patterns """
urlpatterns = [
    path("", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("admin/", admin.site.urls),
    path("nested_admin/", include("nested_admin.urls")),
    path("payments/", include("payments.urls")),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token-verify"),
    path("koie/", include("koie_booking.urls")),
    path("koie/", include("koie_report.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
