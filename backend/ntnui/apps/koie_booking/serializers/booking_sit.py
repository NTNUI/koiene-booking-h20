from enumchoicefield import EnumChoiceField
from rest_framework import serializers

from koie_booking.models.booking import BookingModel
from koie_booking.models.koie import KoieModel
from ntnui.enums import KeyStatus

from django.utils.translation import gettext as _


class BookingSitSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source="user.ntnui_no", read_only=True)
    koie = serializers.SlugRelatedField(
        many=False, slug_field="slug", queryset=KoieModel.objects.all()
    )
    booking_transaction_id = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    key_status = EnumChoiceField(enum_class=KeyStatus)

    def __init__(self, *args, **kwargs):
        kwargs["partial"] = True
        super(BookingSitSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = BookingModel

        fields = [
            "id",
            "price",
            "koie",
            "user",
            "uuid",
            "booking_transaction_id",
            "arrival_date",
            "departure_date",
            "contact_email",
            "guests_member",
            "guests_not_member",
            "paid",
            "created",
            "key_status",
        ]
        read_only_fields = (
            "id",
            "price",
            "koie",
            "user",
            "uuid",
            "booking_transaction_id",
            "arrival_date",
            "departure_date",
            "contact_email",
            "guests_member",
            "guests_not_member",
            "paid",
            "created",
        )

    def get_booking_transaction_id(self, obj):
        """Tries to get the transaction ID, if no payment object exists it returns
        "Has no payment obj"""
        try:
            return obj.get_transaction_id()
        except AttributeError:
            return "Has no payment object"

    def get_price(self, obj):
        return obj.get_total_price()

    def validate_has_key_status(self, data):
        """Checks that the request contains valid key_status """
        key_status = data.pop("key_status", None)
        if not (
            (key_status == KeyStatus.not_picked_up)
            or (key_status == KeyStatus.picked_up)
            or (key_status == KeyStatus.delivered)
        ):
            raise serializers.ValidationError(
                detail={
                    "detail": _(
                        "You cannot change key_status without supplying valid key_status in request"
                    )
                }
            )

    def validate(self, data):
        self.validate_has_key_status(data)
        return data

    def update(self, instance, validated_data):
        key_status = validated_data.pop("key_status", None)
        if (key_status is not None) and (
            (key_status == KeyStatus.not_picked_up)
            or (key_status == KeyStatus.picked_up)
            or (key_status == KeyStatus.delivered)
        ):
            instance.key_status = key_status
        instance.save()
        return super(BookingSitSerializer, self).update(instance, validated_data)
