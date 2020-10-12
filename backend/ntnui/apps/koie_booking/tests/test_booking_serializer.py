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
    return GroupFactory(name="Koiene")


@pytest.fixture
def booking():
    return BookingFactory()


@pytest.fixture
def serializer(booking):
    return BookingSerializer(instance=booking)


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
    }


@pytest.mark.django_db
def test_contains_expected_fields(serializer):
    expected_fields = {
        "id",
        "price",
        "koie",
        "user",
        "booking_transaction_id",
        "arrival_date",
        "departure_date",
        "contact_email",
        "guests_member",
        "guests_not_member",
        "paid",
        "created",
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
@pytest.mark.parametrize("arrival_date", [("2020-03-12"), ("1970-05-05"), ("2019-10-15")])
def test_check_date_raises_error_when_date_is_in_the_past(data, arrival_date):
    data["arrival_date"] = arrival_date
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
@pytest.mark.parametrize("guests_member, guests_not_member", [(10, 2), (2, 10), (12, 0), (0, 12)])
def test_validate_enough_beds_raises_error_when_too_many_guests(
    data, guests_member, guests_not_member
):
    data["guests_member"] = guests_member
    data["guests_not_member"] = guests_not_member
    serializer = BookingSerializer(data=data)
    assert not serializer.is_valid()


def make_booking(data, koie):
    """ Help function to use when creating several bookings in a test """
    return BookingFactory(
        koie=koie,
        arrival_date=data["arrival_date"],
        departure_date=data["departure_date"],
        guests_member=data["guests_member"],
        guests_not_member=data["guests_not_member"],
    )


@pytest.mark.django_db
def test_validate_enough_beds_handles_overlapping_bookings(data, koie):
    """
    Tests that first and second booking made is valid, as the should be
    Then tests that the third booking is not valid and the correct error is raised.
    All bookings are compeletely overlapping.
    """
    data["guests_member"] = 6
    serializer = BookingSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    make_booking(data, koie)

    data["guests_member"] = 4
    serializer = BookingSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    make_booking(data, koie)

    data["guests_member"] = 3
    serializer = BookingSerializer(data=data)
    assert not serializer.is_valid()


@pytest.mark.django_db
def test_validate_enough_beds_handles_almost_overlapping_bookings(data, koie):
    """ 
    Tests that almost overlapping bookings also are accepted.
    Almost overlapping in the meaning that departure_date of an already made booking
        is the same as the arrival_date of a new booking.
    """
    data["guests_member"] = 10
    make_booking(data, koie)
    data["arrival_date"] = now().date() + timedelta(days=1)
    data["departure_date"] = now().date() + timedelta(days=4)
    serializer = BookingSerializer(data=data)
    assert serializer.is_valid()


@pytest.mark.django_db
@pytest.mark.parametrize(
    "arrival_date, departure_date",
    [
        (now().date() - timedelta(days=4), now().date() + timedelta(days=1)),
        (now().date() + timedelta(days=1), now().date() + timedelta(days=2)),
        (now().date() + timedelta(days=3), now().date() + timedelta(days=6)),
    ],
)
def test_make_booking_with_overlap_raises_error(arrival_date, departure_date, koie, data):
    """
    Test that serializer raises error if partially overlapping bookings are already made
    and there are too few beds on the overlapping days
    """
    data["arrival_date"] = arrival_date
    data["departure_date"] = departure_date
    data["guests_member"] = 9
    make_booking(data, koie)

    data["arrival_date"] = now().date()
    data["departure_date"] = now().date() + timedelta(days=6)
    serializer = BookingSerializer(data=data)
    assert not serializer.is_valid()


@pytest.mark.django_db
@pytest.mark.parametrize(
    "arrival_date, departure_date",
    [
        (now().date() - timedelta(days=4), now().date() + timedelta(days=1)),
        (now().date() + timedelta(days=1), now().date() + timedelta(days=2)),
        (now().date() + timedelta(days=3), now().date() + timedelta(days=6)),
    ],
)
def test_make_booking_with_overlap_is_valid(arrival_date, departure_date, koie, data):
    """
    Tests that error is not raised when there are already existing bookings overlapping
    but number of beds available are still enough to make booking
    """
    data["arrival_date"] = arrival_date
    data["departure_date"] = departure_date
    data["guests_member"] = 3
    make_booking(data, koie)

    data["arrival_date"] = now().date()
    data["departure_date"] = now().date() + timedelta(days=6)
    serializer = BookingSerializer(data=data)
    assert serializer.is_valid()


@pytest.mark.django_db
@pytest.mark.parametrize(
    "arrival_date, departure_date",
    [(now().date(), now().date()), (now().date(), now().date() - timedelta(1)),],
)
def test_validate_departure_date_after_arrival_date(arrival_date, departure_date, data):
    """
    Tests that an exception is raised if the depature date is the same as,
    or before, the arrival date.
    """
    data["arrival_date"] = arrival_date
    data["departure_date"] = departure_date
    serializer = BookingSerializer(data=data)
    with pytest.raises(ValidationError):
        serializer.validate_departure_date_after_arrival_date(data)
