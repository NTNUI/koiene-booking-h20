from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from koie_booking.models.booking import BookingModel
from koie_report.models import KoieReportModel
from koie_booking.models.koie import KoieModel
from koie_report.report_serializer import ReportSerializer

from django.utils.translation import gettext as _


class ReportViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = KoieReportModel.objects.all()
    serializer_class = ReportSerializer

    def create(self, request, pk):
        serializer = ReportSerializer(data=request.data)
        booking = BookingModel.objects.get(pk=pk)
        if serializer.is_valid():
            report = KoieReportModel.objects.create(booking=booking, **serializer.validated_data)
            report.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @action(
        url_path="", detail=True, methods=["get"], serializer_class=ReportSerializer,
    )
    def reports_filter_list(self, request, slug):
        try:
            # koie = KoieModel.objects.get(slug=slug)
            # koie = get_object_or_404(KoieModel, slug=slug)
            # bookings = BookingModel.objects.filter(koie=koie)
            # reports = KoieReportModel.objects.filter(booking__in=bookings)
            reports = KoieReportModel.objects.filter(booking__koie__slug=slug)
            serializer = ReportSerializer(reports, context={"request": request}, many=True)

            return Response({"reports": serializer.data}, status=200)
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
