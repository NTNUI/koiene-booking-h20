from rest_framework import serializers

from koie_booking.models.booking import BookingModel
from koie_booking.models.booking_payment import BookingPayment
from koie_booking.models.koie import KoieModel
from koie_booking.utils import date_utils

from django.utils.timezone import now, timedelta
from django.utils.translation import gettext as _


class BookingSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source="user.ntnui_no", read_only=True)
    koie = serializers.SlugRelatedField(
        many=False, slug_field="slug", queryset=KoieModel.objects.all()
    )
    booking_transaction_id = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = BookingModel

        fields = [
            "id",
            "price",
            "koie",
            "user",
            "booking_transaction_id",
            "arrival_date",
            "departure_date",
            "guests",
            "guests_member",
            "guests_not_member",
            "paid",
            "created",
        ]
        read_only_fields = ("price", "booking_transaction_id", "user", "id", "paid", "created")

    def get_booking_transaction_id(self, obj):
        """Tries to get the transaction ID, if no payment object exists it returns
        "Has no payment obj"""
        try:
            return obj.get_transaction_id()
        except AttributeError:
            return "Has no payment object"

    def get_price(self, obj):
        return obj.get_total_price()

    def validate_arrival_date(self, arrival_date):
        """Checks that the arrival date is not in the past when the booking is made"""
        if now().date() > arrival_date:
            raise serializers.ValidationError(
                detail={"detail": _(f"{arrival_date}s is in the past.")}
            )
        return arrival_date

    def validate_departure_date_after_arrival_date(self, data):
        """Validates that the departure date is after the arrival date"""
        if data["departure_date"] <= data["arrival_date"]:
            raise serializers.ValidationError(
                detail={
                    "detail": _(f"{data['departure_date']}s must be after {data['arrival_date']}")
                }
            )

    def validate_within_booking_window(self, data):
        max_days = data["koie"].booking_window
        departure_date = data["departure_date"]
        if (now().date() + timedelta(days=max_days)) < departure_date:
            raise serializers.ValidationError(
                detail={
                    "detail": _(f"{departure_date}s is more than {max_days} days from today's date")
                }
            )

    def validate_enough_beds(self, data):
        """Checks if is enough beds available in the koie to make this booking."""
        dates_availability_koie = data["koie"].get_beds_available_in_booking_window()
        for single_date in date_utils.get_daterange(data["arrival_date"], data["departure_date"]):
            if dates_availability_koie[single_date.strftime("%Y-%m-%d")] < (
                data["guests_member"] + data["guests_not_member"]
            ):
                raise serializers.ValidationError(
                    detail={"detail": _("There aren't enough beds to make this booking")}
                )

    def validate_number_of_guests_not_null(self, data):
        """Checks that the booking contains reservations of beds """
        if (data["guests_member"] == 0) and (data["guests_not_member"] == 0):
            raise serializers.ValidationError(
                detail={"detail": _("You cannot make a booking without selecting any beds")}
            )

    def validate(self, data):
        self.validate_within_booking_window(data)
        self.validate_departure_date_after_arrival_date(data)
        self.validate_number_of_guests_not_null(data)
        self.validate_enough_beds(data)
        return data
