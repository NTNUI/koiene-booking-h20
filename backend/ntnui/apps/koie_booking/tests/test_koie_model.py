from datetime import date, timedelta

import pytest

from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_booking.utils import date_utils

from django.utils.timezone import now


@pytest.fixture()
def koie():
    return KoieFactory()


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture()
def bookings(koie):
    return (
        BookingFactory(),
        BookingFactory(
            koie=koie,
            arrival_date=now() + timedelta(days=1),
            departure_date=now() + timedelta(days=4),
            paid=False,
            created=now(),
        ),
        BookingFactory(
            koie=koie,
            arrival_date=now() + timedelta(days=3),
            departure_date=now() + timedelta(days=4),
            paid=True,
        ),
    )


@pytest.mark.django_db
def test_get_available_beds_by_night(koie, bookings):
    assert koie.number_of_beds == 11
    date_availability = {}
    expected = [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 5, 8, 8, 11]
    for day in date_utils.get_daterange(now(), (now() + timedelta(koie.booking_window))):
        date_availability[day.strftime("%Y-%m-%d")] = expected.pop()
    assert koie.get_beds_available_in_booking_window() == date_availability
    assert len(koie.get_beds_available_in_booking_window()) == koie.booking_window


@pytest.mark.django_db
def test_get_reserved_bookings_returns_correct_amount_of_guests(koie, bookings):
    assert koie.get_number_of_reserved_beds(date.today() + timedelta(3)) == 3


@pytest.mark.django_db
def test_get_paid_bookings_returns_correct_amount_of_bookings(koie, bookings):
    assert koie.get_number_of_sold_beds(date.today() + timedelta(3)) == 3
