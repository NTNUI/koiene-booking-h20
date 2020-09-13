from django.urls import include, path
from rest_framework import routers

from koie_booking.views.booking import BookingViewSet


router = routers.DefaultRouter()

router.register("report", KoieReportViewset, basename="koie_report")


""" Include URL Patterns """
urlpatterns = [path("", include(router.urls))]