from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from koie_booking.models.koie import KoieModel
from koie_booking.models.booking import BookingModel
from koie_report.models import KoieReportModel
from koie_report.report_serializer import ReportSerializer, FilteredReportSerializer
from koie_report.permissions import IsKoieAdmin

from django.utils.timezone import now
from django.utils.translation import gettext as _


class ReportViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    ViewSet for getting all reports and post a koie report.
    """

    queryset = KoieReportModel.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsKoieAdmin]

    def list(self, request):
        if IsKoieAdmin.has_object_permission(request.user, request=request, view=self):
            reports = KoieReportModel.objects.all()
            serializer = ReportSerializer(reports, context={"request": request}, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": _("You must be a koie admin to access report information.")}, status=403
            )

    def create(self, request, pk):
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

    @action(
        url_path="", detail=True, methods=["get"], serializer_class=FilteredReportSerializer,
    )
    def reports_filter_list(self, request, slug):
        try:
            reports = KoieReportModel.objects.filter(booking__koie__slug=slug)
            serializer = FilteredReportSerializer(reports, context={"request": request}, many=True)

        except KoieModel.DoesNotExist:
            return Response(
                {"detail": _(f"Koie with specified slug: {slug}, not found.")}, status=404
            )
        except BookingModel.DoesNotExist:
            return Response(
                {"detail": _(f"No booking for koie with slug: {slug} found.")}, status=404
            )
        except KoieReportModel.DoesNotExist:
            return Response(
                {"detail": _(f"Report with specified koie_slug: {slug}, not found.")}, status=404
            )
        if IsKoieAdmin.has_object_permission(request.user, request=request, view=self):
            return Response({"reports": serializer.data}, status=200)
        else:
            return Response(
                {"detail": _("You must be a koie admin to access report information.")}, status=403
            )
