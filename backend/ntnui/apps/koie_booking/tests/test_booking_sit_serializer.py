import pytest
from rest_framework.exceptions import ValidationError

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_booking.serializers.booking import BookingSerializer

from django.utils.timezone import now, timedelta


@pytest.fixture
def user():
    return UserFactory()


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="SiT")


@pytest.fixture
def booking():
    return BookingFactory()


@pytest.fixture
def serializer(booking):
    return BookingSerializer(instance=booking)


@pytest.fixture
def koie():
    return KoieFactory()


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
@pytest.mark.parametrize(
    "guests_member, guests_not_member", [(2, -1), (-1, 2), (-1, 0), (0, -1), (0, 0)]
)
def test_validate_negative_number_of_guests_raises_error(data, guests_member, guests_not_member):
    data["guests_member"] = guests_member
    data["guests_not_member"] = guests_not_member
    serializer = BookingSerializer(data=data)
    assert not serializer.is_valid()


@pytest.mark.django_db
@pytest.mark.parametrize(
    "departure_date",
    [
        (str(now().date() + timedelta(days=15))),
        (str(now().date() + timedelta(days=17))),
        (str(now().date() + timedelta(days=20))),
    ],
)
def test_check_date_outside_booking_window_raises_error(data, departure_date):
    data["departure_date"] = departure_date
    serializer = BookingSerializer(data=data)
    assert not serializer.is_valid()


@pytest.mark.django_db
@pytest.mark.parametrize("key_status", [("picked_up"), ("not_picked_up"), ("delivered")])
def test_validate_key_status(data, key_status):
    pass
