from rest_framework import serializers 
from ntnui.apps.koiene_report.models import ReportModel
 
 
class KoieneReportSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = KoieneReport
        # Include all fields from KoieneReport model
        fields = (__all__)