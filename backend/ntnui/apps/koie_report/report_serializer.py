from koie_report.models import KoieReportModel
from rest_framework import serializers


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = KoieReportModel
        # For get requests
        # fields = '__all__'
        # Don't include booking as a field, this will be passed by the url
        exclude = ["booking"]
