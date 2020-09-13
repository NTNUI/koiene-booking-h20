from unittest.mock import Mock

from django.core.exceptions import ValidationError
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from koiene_report.models import ReportModel
from koiene_report.serializers import KoieneReportSerializer

from django.utils.translation import gettext as _

class BookingViewSet(
    mixins.CreateModelMixin
):
    serializer_class = KoieneReportSerializer
    
    def create(self, request):
        serializer = KoieneReportSerializer(data=request.data)
        if serializer.is_valid():
            try:
                report = ReportModel.objects.create(
                    booking.user=request.user, **serializer.validated_data
                )
                report.save()
                return Response(
                    {
                        "report": KoieneReportSerializer(
                            report, context={"request": request}, many=False
                        ).data
                    }
                )
            except ValidationError:
                return Response({"detail": _("Could not create booking")}, status=400)
        else:
            return Response({"detail": serializer.errors}, status=400)
