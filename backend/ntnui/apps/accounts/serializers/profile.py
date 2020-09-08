from django.db.models import Max
from rest_framework import serializers

from accounts.models import UserModel
from accounts.serializers.contract import ContractSerializer


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()
    contract_expiry_date = serializers.SerializerMethodField()
    contracts = ContractSerializer(many=True, read_only=True)

    def get_email(self, obj):
        return obj.get_contact_email()

    def get_phone_number(self, obj):
        return obj.get_phone_number(formatted=True)

    def get_contract_expiry_date(self, obj):
        return obj.contracts.aggregate(Max("expiry_date")).get("expiry_date__max")

    class Meta:
        model = UserModel
        fields = (
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "register_date",
            "contracts",
            "contract_expiry_date",
        )
