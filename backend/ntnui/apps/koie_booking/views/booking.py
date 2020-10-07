from django.core.exceptions import ValidationError
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from koie_booking.models.booking import BookingModel
from koie_booking.models.booking_payment import BookingPayment
from koie_booking.serializers.booking import BookingSerializer

from django.utils.translation import gettext as _


class BookingViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = BookingModel.objects.all()
    serializer_class = BookingSerializer

    def list(self, request):
        bookings = BookingModel.objects.all()
        serializer = BookingSerializer(bookings, context={"request": request}, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            try:
                booking = BookingModel.objects.create(
                    user=request.user,
                    booking_payment=BookingPayment.objects.create(price=1),
                    **serializer.validated_data
                )
                booking.booking_payment.price = booking.get_total_price()
                booking.save()
                return Response(
                    {
                        "booking": BookingSerializer(
                            booking, context={"request": request}, many=False
                        ).data
                    }
                )
            except ValidationError:
                return Response({"detail": _("Could not create booking")}, status=400)
        else:
            return Response({"detail": serializer.errors}, status=400)

    def retrieve(self, request, pk):
        try:
            booking = self.queryset.get(id=pk)
            serializer = BookingSerializer(booking, context={"request": request})
            return Response({"booking": serializer.data})
        except BookingModel.DoesNotExist:
            return Response({"detail": _("Booking not found.")}, status=404)
