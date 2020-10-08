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


@pytest.fixture()
def expected_availability(koie):
    """ Builds expected availability of beds, for bookings made in above fixture """
    expected_availability = {}
    expected = [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 5, 8, 8, 11]
    for day in date_utils.get_daterange(now(), (now() + timedelta(koie.booking_window))):
        expected_availability[day.strftime("%Y-%m-%d")] = expected.pop()
    return expected_availability


@pytest.mark.django_db
def test_get_beds_available_in_date_range(koie, bookings, expected_availability):
    """ Koie_model should return correct information about available beds for given date range """

    actual_availability = koie.get_beds_available_in_date_range(
        now(), (now() + timedelta(koie.booking_window))
    )

    assert koie.number_of_beds == 11
    assert actual_availability == expected_availability
    assert len(actual_availability) == koie.booking_window


@pytest.mark.django_db
def test_get_available_beds_in_booking_window(koie, bookings, expected_availability):
    """ Koie_model should return correct information about available beds in its booking window """

    actual_availability = koie.get_beds_available_in_booking_window()

    assert koie.number_of_beds == 11
    assert actual_availability == expected_availability
    assert len(actual_availability) == koie.booking_window


@pytest.mark.django_db
def test_get_reserved_bookings_returns_correct_amount_of_guests(koie, bookings):
    """ Helper function get_reserved_bookings in koie_model should return correct amount of beds reserved """

    assert koie.get_number_of_reserved_beds(date.today() + timedelta(3)) == 3


@pytest.mark.django_db
def test_get_paid_bookings_returns_correct_amount_of_bookings(koie, bookings):
    """ Helper function get_paid_bookings in koie_model should return correct amount of beds that have been paid for """

    assert koie.get_number_of_sold_beds(date.today() + timedelta(3)) == 3
