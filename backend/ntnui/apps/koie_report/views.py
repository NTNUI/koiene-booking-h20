from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from koie_booking.models.booking import BookingModel
from koie_report.models import KoieReportModel
from koie_report.report_serializer import ReportSerializer

from django.utils.timezone import now
from django.utils.translation import gettext as _


class ReportViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = KoieReportModel.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAdminUser]
    # TODO: Change to customized permission class in next user story


class ReportAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pk):
        serializer = ReportSerializer(data=request.data)
        booking = BookingModel.objects.get(pk=pk)
        if serializer.is_valid():
            report = KoieReportModel.objects.create(
                booking=booking, date_created_at=now(),
                **serializer.validated_data
            )
            report.save()
            return Response({"detail": _("Report were successfully created.")},
                            status=201)
        return Response({"detail": _("You have passed in invalid data. Make sure to pass in valid data.")},
                        status=400)
