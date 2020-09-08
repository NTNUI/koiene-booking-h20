from rest_framework import serializers

from accounts.models import UserModel

from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import (
    get_default_password_validators,
    validate_password,
)


class PasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    password_1 = serializers.CharField(min_length=8, write_only=True)
    password_2 = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = UserModel
        fields = ("old_password", "password_1", "password_2")

    def validate(self, data):
        if data["password_1"] != data["password_2"]:  # Check if the 2 passwords match
            raise serializers.ValidationError("De nye passordene er ikke like")
        user = authenticate(
            username=self.context["request"].user.email, password=data["old_password"]
        )
        if not user:
            raise serializers.ValidationError("Gammelt passord stemmer ikke")
        password_validators = get_default_password_validators()
        validate_password(data["password_1"], user=user, password_validators=password_validators)
        return {"new_password": data["password_1"]}
