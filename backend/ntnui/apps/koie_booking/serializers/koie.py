from rest_framework import serializers

from koie_booking.models.koie import KoieModel
from koie_booking.serializers.description import DescriptionSerializer
from koie_booking.serializers.location import LocationSerializer


class KoieSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    description = DescriptionSerializer()

    beds_available_in_booking_window = serializers.SerializerMethodField()

    class Meta:
        model = KoieModel
        lookup_field = "slug"

        fields = "__all__"

    def get_beds_available_in_booking_window(self, obj):
        return obj.get_beds_available_in_booking_window()
