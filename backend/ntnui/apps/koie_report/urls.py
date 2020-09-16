from django.urls import include, path
from rest_framework import routers

from koie_report.views import ReportViewSet, ReportPostViewSet

router = routers.DefaultRouter()
router.register('reports', ReportViewSet, basename='koie_report')
router.register('reports/post/<int:booking_id>', ReportPostViewSet, basename='koie_report_post')

""" Include URL Patterns """
urlpatterns = [path("", include(router.urls))]