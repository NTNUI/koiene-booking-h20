from django.urls import include, path
from rest_framework import routers

from koie_booking.views.booking import BookingViewSet
from koie_booking.views.koie import KoieViewSet

router = routers.DefaultRouter()

router.register("koie", KoieViewSet, basename="koie")
router.register("booking", BookingViewSet, basename="booking")

""" Include URL Patterns """
urlpatterns = [path("", include(router.urls))]
