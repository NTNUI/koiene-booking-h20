from django.urls import path

from koie_report.views import ReportViewSet

""" Include URL Patterns """
urlpatterns = [
    path("reports/", ReportViewSet.as_view({"get": "list"}), name="koie_report_list"),
    path("reports/<int:pk>", ReportViewSet.as_view({"post": "create"}), name="koie_create"),
]
