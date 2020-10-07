from django.urls import include, path
from rest_framework import routers

from koie_booking.views.koie import KoieViewSet
from koie_booking.views.koie_dashboard import KoieDashboardViewSet

router = routers.DefaultRouter()

router.register("koie", KoieViewSet, basename="koie")
router.register("availability", KoieDashboardViewSet)
router.register("booking", BookingViewSet)
""" Include URL Patterns """
urlpatterns = [path("", include(router.urls))]
