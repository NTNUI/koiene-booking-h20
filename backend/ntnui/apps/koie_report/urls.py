from django.urls import path

from koie_report.views import ReportViewSet

""" Include URL Patterns """
urlpatterns = [
    path("reports/<int:pk>", ReportViewSet.as_view({"post": "create"}), name="koie_create"),
    path("reports/", ReportViewSet.as_view({"get": "list"}), name="koie_list"),
    path("reports/<slug:slug>", ReportViewSet.as_view({"get": "reports_filter_list"})),
]
