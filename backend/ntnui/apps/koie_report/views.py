from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from koie_booking.models.booking import BookingModel
from koie_report.models import KoieReportModel
from koie_report.report_serializer import ReportSerializer

from django.utils.timezone import now


class ReportViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = KoieReportModel.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAdminUser]


class ReportAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pk):
        serializer = ReportSerializer(data=request.data)
        booking = BookingModel.objects.get(pk=pk)
        if serializer.is_valid():
            report = KoieReportModel.objects.create(
                booking=booking, date_created_at=now(), **serializer.validated_data
            )
            report.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
