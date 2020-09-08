from rest_framework import serializers

from groups.models import MembershipModel


class MembershipPersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipModel
        fields = ("membership_no", "type", "group_expiry")
        read_only_fields = ("membership_no", "group_expiry")


class MembershipLeaderSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    ntnui_no = serializers.SerializerMethodField()

    class Meta:
        model = MembershipModel
        fields = (
            "first_name",
            "last_name",
            "email",
            "ntnui_no",
            "group_expiry",
            "type",
            "membership_no",
        )
        read_only_fields = ("date_joined", "membership_no")

    def get_first_name(self, obj):
        return obj.member.first_name

    def get_last_name(self, obj):
        return obj.member.last_name

    def get_email(self, obj):
        return obj.member.email

    def get_ntnui_no(self, obj):
        return obj.member.ntnui_no
