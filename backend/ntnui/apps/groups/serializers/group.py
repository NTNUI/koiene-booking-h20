from rest_framework import serializers

from groups.models import GroupModel
from groups.models.responsibility import ResponsibilityModel
from groups.serializers.membership import MembershipPersonalSerializer
from ntnui.enums import ACCESS_CHOICES


class GroupSerializerBasic(serializers.ModelSerializer):
    member = serializers.SerializerMethodField()
    access = serializers.CharField(read_only=False)

    class Meta:
        model = GroupModel
        fields = [
            "group_id",
            "name",
            "slug",
            "member",
            "access",
            "category",
        ]

    def user_is_authenticated(self):
        return "request" in self.context and self.context["request"].user.is_authenticated

    def get_request_user(self):
        return self.context["request"].user if self.user_is_authenticated() else None

    def get_member(self, obj):
        return self.get_request_user() in obj.members.all()
