from rest_framework import serializers

from koie_booking.models.koie import Description


class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = "__all__"
