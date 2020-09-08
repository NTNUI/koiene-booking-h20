from datetime import date, datetime, timedelta

import pytest
from django.db.utils import IntegrityError

from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory


@pytest.fixture()
def koie():
    return KoieFactory()


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture()
def booking():
    return BookingFactory(guests_member=1, guests_not_member=0)


@pytest.mark.django_db
def test_booking_has_user(booking):
    assert booking.user


@pytest.mark.django_db
@pytest.mark.parametrize(
    "guests_member, guests_not_member, number_of_nights, expected", [(1, 2, 2, 400), (1, 1, 1, 120)]
)
def test_price_calculation(booking, guests_member, guests_not_member, number_of_nights, expected):
    booking.guests_member = guests_member
    booking.guests_not_member = guests_not_member
    booking.departure_date = date.today() + timedelta(days=number_of_nights)
    assert booking.get_total_price() == expected


@pytest.mark.django_db
@pytest.mark.parametrize(
    "guests_member, guests_not_member, number_of_nights, expected", [(1, 0, 1, 40), (0, 1, 1, 80)]
)
def test_price_calculation_one_type_of_guests(
    booking, guests_member, guests_not_member, number_of_nights, expected
):
    booking.guests_member = guests_member
    booking.guests_not_member = guests_not_member
    booking.departure_date = date.today() + timedelta(days=number_of_nights)
    assert booking.get_total_price() == expected


@pytest.mark.django_db
@pytest.mark.parametrize(
    "departure_date, arrival_date, expected",
    [("2020-04-15", "2020-04-14", 1), ("2020-02-10", "2020-02-01", 9)],
)
def test_get_number_of_nights(booking, departure_date, arrival_date, expected):
    booking.departure_date = datetime.strptime(departure_date, "%Y-%m-%d")
    booking.arrival_date = datetime.strptime(arrival_date, "%Y-%m-%d")
    assert booking.get_number_of_nights() == expected


@pytest.mark.django_db
@pytest.mark.parametrize(
    "guests_member, guests_not_member, error", [(-1, 4, IntegrityError), (2, -1, IntegrityError)]
)
def test_negative_number_of_guests_throws_error(booking, guests_member, guests_not_member, error):
    booking.guests_member = guests_member
    booking.guests_not_member = guests_not_member
    with pytest.raises(error):
        booking.save()


@pytest.mark.django_db
def test_get_booking_payment(booking):
    assert booking.booking_payment
