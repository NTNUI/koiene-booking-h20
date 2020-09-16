from django.urls import include, path
from rest_framework import routers

from koie_report.views import ReportViewSet, report_list


""" Include URL Patterns """
urlpatterns = [path("reports/create/<int:pk>", ReportViewSet.as_view({'post' : 'create'}),name = 'koie_create'),
path("reports", report_list,name = 'koie_create'),

]