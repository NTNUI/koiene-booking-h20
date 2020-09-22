from rest_framework import serializers

from koie_booking.models.koie import KoieModel
from datetime import date

class KoierDetailedSerializer(serializers.ModelSerializer):
    beds_available_in_next_days = serializers.SerializerMethodField()

    class Meta:
        model = KoieModel

        fields = (
            "name",
            "slug",
            "number_of_beds",
            "booking_window",
            "beds_available_in_next_days",
        )

    def get_beds_available_in_next_days(self, obj):
        days = int(self.context["days"])
        return obj.get_beds_available_for_next_days(days)

class KoierDetailedRangeSerializer(serializers.ModelSerializer):
    beds_available_in_date_range = serializers.SerializerMethodField()

    class Meta:
        model = KoieModel

        fields = (
            "name",
            "slug",
            "number_of_beds",
            "booking_window",
            "beds_available_in_date_range",
        )

    def get_beds_available_in_date_range(self, obj):
        fromDate = date.fromisoformat(self.context["fromDate"])
        toDate = date.fromisoformat(self.context["toDate"])
        return obj.get_beds_available_in_date_range(fromDate, toDate)