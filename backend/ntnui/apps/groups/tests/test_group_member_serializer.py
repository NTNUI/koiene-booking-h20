import pytest

from accounts.models.user import UserModel
from groups.models import GroupModel, MembershipModel
from groups.serializers.membership import MembershipLeaderSerializer


@pytest.fixture()
def user_attributes():
    return {"first_name": "Sprint", "last_name": "Fast", "email": "Sprint@ntnui.no"}


@pytest.fixture()
def serialized_data():
    return {"first_name": "Sprint", "last_name": "Fast", "email": "Sprint@ntnui.no"}


@pytest.fixture()
def user(user_attributes):
    return UserModel.objects.create(**user_attributes)


@pytest.fixture()
def group():
    return GroupModel.objects.create(name="test_group")


@pytest.fixture()
def membership(group, user):
    return MembershipModel.objects.create(group=group, member=user)


@pytest.fixture()
def serializer(membership):
    return MembershipLeaderSerializer(instance=membership)


@pytest.mark.django_db
def test_serializer_data_contains_expected_fields(serializer):
    data = serializer.data
    expected_fields = {
        "first_name",
        "last_name",
        "email",
        "ntnui_no",
        "group_expiry",
        "type",
        "membership_no",
    }

    assert data.keys() == expected_fields
