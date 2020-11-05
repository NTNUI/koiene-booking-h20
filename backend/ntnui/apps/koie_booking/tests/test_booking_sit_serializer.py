import pytest

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_booking.serializers.booking_sit import BookingSitSerializer

from django.utils.timezone import now, timedelta


@pytest.fixture
def user():
    return UserFactory()


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture
def booking():
    return BookingFactory()


@pytest.fixture
def serializer(booking):
    return BookingSitSerializer(instance=booking)


@pytest.fixture
def koie():
    return KoieFactory()


@pytest.fixture
def data(koie):
    return {
        "koie": koie.slug,
        "arrival_date": now().date(),
        "departure_date": now().date() + timedelta(days=1),
        "guests_member": 1,
        "guests_not_member": 0,
        "key_status": "not_picked_up",
    }


@pytest.mark.django_db
def test_contains_expected_fields(serializer):
    expected_fields = {
        "id",
        "price",
        "koie",
        "user",
        "uuid",
        "booking_transaction_id",
        "arrival_date",
        "departure_date",
        "contact_email",
        "guests_member",
        "guests_not_member",
        "paid",
        "created",
        "key_status",
    }
    data = serializer.data
    assert data.keys() == expected_fields


@pytest.mark.django_db
@pytest.mark.parametrize("key_status", [("picked_up"), ("not_picked_up"), ("delivered")])
def test_validate_key_status_lets_through_valid(data, key_status):
    data["key_status"] = key_status
    serializer = BookingSitSerializer(data=data)
    assert serializer.is_valid()


@pytest.mark.django_db
@pytest.mark.parametrize("key_status", [("picked_upasdf"), ("not_pickqwefup"), ("delivereqwed")])
def test_validate_key_status_picks_up_invalid(data, key_status):
    data["key_status"] = key_status
    try:
        serializer = BookingSitSerializer(data=data)
    except Exception:
        assert not serializer.is_valid()
