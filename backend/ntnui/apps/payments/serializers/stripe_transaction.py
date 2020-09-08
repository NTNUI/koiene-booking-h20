from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from payments.models import StripeTransaction


class StripeTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StripeTransaction
        fields = ("token_id",)

    def validate(self, data):
        """ Is used by serializer.is_valid() """

        if "token_id" not in data:
            raise ValidationError("Missing token_id")

        return data
