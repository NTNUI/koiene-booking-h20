from datetime import date

from rest_framework import serializers

from koie_booking.models.koie import KoieModel

from django.utils.timezone import now, timedelta


class KoierDetailedSerializer(serializers.ModelSerializer):
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
        days = int(self.context["days"])
        current_date = now().date()
        return obj.get_beds_available_in_date_range(
            current_date, (current_date + timedelta(days=days))
        )


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
        from_date = date.fromisoformat(self.context["from_date"])
        to_date = date.fromisoformat(self.context["to_date"])
        return obj.get_beds_available_in_date_range(from_date, to_date)
