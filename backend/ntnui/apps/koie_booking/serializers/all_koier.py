from rest_framework import serializers

from koie_booking.models.koie import KoieModel


class KoierSerializer(serializers.ModelSerializer):
    class Meta:
        model = KoieModel

        fields = (
            "name",
            "number_of_beds",
            "album",
        )
