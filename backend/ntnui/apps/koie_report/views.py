from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from koie_booking.models.booking import BookingModel
from koie_booking.models.koie import KoieModel
from koie_report.models import KoieReportModel
from koie_report.permissions import IsKoieAdmin
from koie_report.report_serializer import FilteredReportSerializer, ReportSerializer

from django.utils.timezone import now
from django.utils.translation import gettext as _


class ReportViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    ViewSet for getting reports from koie_slug and post a koie report.
    """

    queryset = KoieReportModel.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsKoieAdmin]

    def list(self, request, slug):
        """ Lists all reports for given koie_slug """
        if IsKoieAdmin.has_object_permission(request.user, request=request, view=self):
            try:
                koie = KoieModel.objects.get(slug=slug)
                reports = KoieReportModel.objects.filter(booking__koie=koie)
            except KoieModel.DoesNotExist:
                return Response(
                    {"detail": _(f"Koie with specified slug: {slug}, not found.")}, status=404
                )

            serializer = FilteredReportSerializer(reports, context={"request": request}, many=True)
            if len(serializer.data) == 0:
                return Response(
                    {"detail": _(f"No reports found for given koie_slug: {slug}.")}, status=404
                )

            return Response({"reports": serializer.data}, status=200)

        else:
            return Response(
                {"detail": _("You must be a koie admin to access report information.")}, status=403
            )

    def create(self, request, pk):
        """ Create new report, {id} is booking_id for the booking the report is connected to """
        serializer = ReportSerializer(data=request.data)
        booking = BookingModel.objects.get(pk=pk)
        if serializer.is_valid():
            report = KoieReportModel.objects.create(
                booking=booking, date_created_at=now(), **serializer.validated_data
            )
            report.save()

            return Response({"detail": _("Report were successfully created.")}, status=201)
        return Response(
            {"detail": _("You have passed in invalid data. Make sure to pass valid data.")},
            status=400,
        )
