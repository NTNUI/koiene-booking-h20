from koie_report.models import KoieReportModel
from rest_framework import serializers


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = KoieReportModel
        # For get requests 
        # fields = '__all__'
        exclude = ["booking"]
        # Don't include booking as a field, this will be passed by the url 
        # fields = ["date_created_at", "comment", "wood", "smoke_detector","gas"]