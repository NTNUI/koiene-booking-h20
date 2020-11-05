from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.template.defaultfilters import slugify
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from koie_booking.models.booking import BookingModel
from koie_booking.serializers.booking_sit import BookingSitSerializer
from koie_report.permissions import IsSitMemberOrKoieAdmin
from ntnui.enums import KeyStatus

from django.utils.translation import gettext as _


class BookingSitViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = BookingModel.objects.all()
    serializer_class = BookingSitSerializer
    lookup_field = "uuid"
    ordering_fields = ("created", "arrival_date", "departure_date", "user", "koie")
    permission_classes = (IsSitMemberOrKoieAdmin,)

    def filter_queryset_key_status(self):
        """Filters the queryset based on key_status, and checks that key_status is valid"""

        if self.request.query_params.get("key_status") and any(
            [self.request.query_params.get("key_status") == status.name for status in KeyStatus]
        ):
            return self.queryset.filter(
                key_status=KeyStatus[self.request.query_params.get("key_status")]
            )
        return self.queryset

    def list(self, request):
        """
        Gets bookings for sit view. 
        QueryParams: [key_status, koie, arrival_date_start,
        arrival_date_end, departure_date_start, departure_date_end,
        order_by]
        Dates are provided in ISO-format: YYYY-MM-DD
        """
        # Filter on key_status
        self.queryset = self.filter_queryset_key_status()

        # Filter on koie
        koie = self.request.query_params.get("koie", None)
        if koie:
            self.queryset = self.queryset.filter(koie__slug=slugify(koie))

        # Filter on arrival_date
        arrival_date_start = self.request.query_params.get("arrival_date_start", None)
        if arrival_date_start:
            self.queryset = self.queryset.filter(arrival_date__gte=arrival_date_start)

        arrival_date_end = self.request.query_params.get("arrival_date_end", None)
        if arrival_date_end:
            self.queryset = self.queryset.filter(arrival_date__lte=arrival_date_end)

        # Filter on departure_date
        departure_date_start = self.request.query_params.get("departure_date_start", None)
        if departure_date_start:
            self.queryset = self.queryset.filter(departure_date__gte=departure_date_start)

        departure_date_end = self.request.query_params.get("departure_date_end", None)
        if departure_date_end:
            self.queryset = self.queryset.filter(departure_date__lte=departure_date_end)

        # Ordering
        order = self.request.query_params.get("order_by", None)
        if order and order in self.ordering_fields:
            self.queryset = self.queryset.order_by(order)
        else:
            self.queryset = self.queryset.order_by(self.ordering_fields[0])

        serializer = BookingSitSerializer(self.queryset, context={"request": request}, many=True)
        return Response(serializer.data)

    def retrieve(self, request, uuid):
        try:
            booking = self.queryset.get(uuid=uuid)
            serializer = BookingSitSerializer(booking, context={"request": request})
            return Response(serializer.data)
        except BookingModel.DoesNotExist:
            return Response({"detail": _("Booking not found.")}, status=404)

    def update(self, request, *args, **kwargs):
        """ Returns a response saying that the method is not allowed. """

        return Response({"detail": "Not yet implemented use PATCH"}, status=400)

    def partial_update(self, request, uuid=None):
        """ Changes field: key_status. Requires fields key_status and koie to be specified """

        try:
            self.check_object_permissions(self.request, self.get_object())
            serializer = BookingSitSerializer(
                self.get_object(),
                context={"request": request},
                many=False,
                data=request.data,
                partial=True,
            )
            if serializer.is_valid():
                self.perform_update(serializer)
                return Response({"detail": _("Changes were made")})
            else:
                return Response({"detail": serializer.errors}, status=400)
        except BookingModel.DoesNotExist:
            return Response({"detail": "Could not find booking"}, status=400)
        except ObjectDoesNotExist:
            return Response({"detail": "Could not find object"}, status=400)
        except KeyError:
            return Response(
                {
                    "detail": "key_status can only be one of: 'not_picked_up', 'picked_up', 'delivered'"
                },
                status=400,
            )
