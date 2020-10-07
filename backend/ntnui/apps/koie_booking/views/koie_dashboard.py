from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

import koie_booking.constants as constants
from koie_booking.models.koie import KoieModel
from koie_booking.serializers.all_koier_detailed import (
    KoierDetailedRangeSerializer,
    KoierDetailedSerializer,
)

from django.utils.timezone import now, timedelta
from django.utils.translation import gettext as _


class KoieDashboardViewSet(
    mixins.ListModelMixin, viewsets.GenericViewSet,
):
    queryset = KoieModel.objects.all()
    serializer_class = KoierDetailedSerializer
    paginator = None

    @action(
        url_path="range",
        detail=False,
        methods=["get"],
        serializer_class=KoierDetailedRangeSerializer,
    )
    def range(self, request):
        """ List dashboard details of all koier within given timerange.
            Dates are supplied as query_parameters {from_date} and {to_date}.
            Format: "YYYY-MM-DD"
        """
        from_date = request.query_params.get("from_date")
        if not from_date:
            from_date = now().date().isoformat()

        to_date = request.query_params.get("to_date")
        if not to_date:
            to_date = (now().date() + timedelta(days=constants.DEFAULT_BOOKING_WINDOW)).isoformat()

        serializer = KoierDetailedRangeSerializer(
            self.queryset,
            context={"request": request, "from_date": from_date, "to_date": to_date},
            many=True,
        )
        return Response({"koier": serializer.data})

    def list(self, request):
        """ List dashboard details of all koier from current date and given number of days forward
            {days} is supplied as query_parameter
        """
        days = request.query_params.get("days")
        if not days:
            days = constants.DEFAULT_BOOKING_WINDOW

        serializer = KoierDetailedSerializer(
            self.queryset, context={"request": request, "days": days}, many=True
        )
        return Response({"koier": serializer.data})
