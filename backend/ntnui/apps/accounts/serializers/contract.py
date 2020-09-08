from rest_framework import serializers

from accounts.models import Contract


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = ("expiry_date", "type")
