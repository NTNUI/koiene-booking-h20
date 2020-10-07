from django.urls import path

from koie_report.views import ReportViewSet, ReportAPIView

""" Include URL Patterns """
urlpatterns = [
    path("report/<int:pk>", ReportViewSet.as_view({"get": "retrieve"}), name="koie_retrieve"),
    path("reports/", ReportViewSet.as_view({"get": "list"}), name="koie_report_list"),
    path("reports/booking/<int:pk>", ReportAPIView.as_view(), name="koie_create")
]
