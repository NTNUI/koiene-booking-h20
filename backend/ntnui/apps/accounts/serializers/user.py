from rest_framework import serializers

from accounts.models import UserModel


class UserSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()

    def get_email(self, obj):
        return obj.get_contact_email()

    class Meta:
        model = UserModel
        fields = ("first_name", "last_name", "email", "ntnui_no")
