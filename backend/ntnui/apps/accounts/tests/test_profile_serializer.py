from datetime import date

import pytest

from accounts.factories.user_factory import UserFactory
from accounts.models.contract import Contract
from accounts.serializers.profile import ProfileSerializer


@pytest.fixture()
def user():
    return UserFactory()


@pytest.mark.django_db
def test_profile_serializer_contains_expected_fields(user):
    expected_fields = {
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "register_date",
        "contracts",
        "contract_expiry_date",
    }

    actual_data = ProfileSerializer(instance=user).data

    assert actual_data.keys() == expected_fields


@pytest.mark.django_db
def test_first_name_field_content(user):
    expected_first_name = user.first_name
    actual_first_name = ProfileSerializer(instance=user).data["first_name"]

    assert actual_first_name == expected_first_name


@pytest.mark.django_db
def test_contract_expiry_date_filed_content(user):
    expected_expiry_date = date.today()
    Contract.objects.create(user=user, expiry_date=expected_expiry_date)
    actual_contract_expiry_date = ProfileSerializer(instance=user).data["contract_expiry_date"]

    assert actual_contract_expiry_date == expected_expiry_date
