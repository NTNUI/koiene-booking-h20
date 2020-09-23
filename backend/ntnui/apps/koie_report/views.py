from koie_report.models import KoieReportModel
from koie_report.serializers.report_serializer import ReportSerializer
from koie_booking.models.booking import BookingModel
from rest_framework import mixins, viewsets
from rest_framework.response import Response


class ReportViewSet(viewsets.GenericViewSet, mixins.ListModelMixin
                    ):
    queryset = KoieReportModel.objects.all()
    serializer_class = ReportSerializer

    def create(self, request, pk):
        serializer = ReportSerializer(data=request.data)
        booking = BookingModel.objects.get(pk=pk)
        if serializer.is_valid():
            report = KoieReportModel.objects.create(
                booking=booking, **serializer.validated_data)
            report.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
