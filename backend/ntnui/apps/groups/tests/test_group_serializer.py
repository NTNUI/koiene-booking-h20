import datetime

import pytest

from groups.models.group import GroupModel
from groups.serializers.group import GroupSerializerBasic


@pytest.fixture()
def group_attributes():
    return {
        "name": "Sprint",
    }


@pytest.fixture()
def group(group_attributes):
    return GroupModel.objects.create(**group_attributes)


@pytest.fixture()
def serialized_data():
    return {
        "name": "Sprint",
        "founding_date": datetime.date.today,
    }


@pytest.fixture()
def serializer(group):
    return GroupSerializerBasic(instance=group)


@pytest.mark.django_db
def test_contains_expected_fields(serializer):

    data = serializer.data
    expected_fields = {
        "group_id",
        "name",
        "slug",
        "member",
        "access",
        "category",
    }

    assert data.keys() == expected_fields
