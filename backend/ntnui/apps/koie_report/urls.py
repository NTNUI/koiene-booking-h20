from django.urls import include, path
from rest_framework import routers

from koie_report.views import ReportViewSet


""" Include URL Patterns """
urlpatterns = [path("reports/<int:pk>", ReportViewSet.as_view({'post': 'create'}), name='koie_create'),
               path('reports/', ReportViewSet.as_view({'get': 'list'}), name="koie_report_list")]
