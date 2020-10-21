import uuid

import factory
import pytest
from rest_framework.test import APIRequestFactory, force_authenticate

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_booking.views.booking import BookingViewSet

from django.utils.timezone import now, timedelta


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture()
def koie():
    return KoieFactory()


@pytest.fixture()
def booking(koie):
    return BookingFactory(koie=koie)


@pytest.fixture()
def booking_batch(koie):
    return BookingFactory.create_batch(3, koie=koie)


@pytest.fixture()
def booking_data(koie, booking):
    return {
        "koie": koie.slug,
        "arrival_date": booking.arrival_date,
        "departure_date": booking.departure_date,
        "guests_member": booking.guests_member,
        "guests_not_member": booking.guests_member,
    }


@pytest.fixture()
def user():
    return UserFactory()


@pytest.fixture()
def request_factory():
    return APIRequestFactory()


def get_response(request, user=None, booking=None, koie=None):
    force_authenticate(request, user=user)

    if booking:
        view = BookingViewSet.as_view({"get": "retrieve"})
        return view(request, booking)
    else:
        view = BookingViewSet.as_view({"get": "list", "post": "create"})
        return view(request)


@pytest.mark.django_db
def test_list_booking(request_factory, booking_batch):

    request = request_factory.get(f"/koie/koie/booking")
    response = get_response(request=request)

    first_id = response.data[0]["uuid"]

    assert response.status_code == 200
    assert len(response.data) == 3
    assert uuid.UUID(hex=first_id) == booking_batch[0].uuid


@pytest.mark.django_db
def test_retrieve_booking_from_id(request_factory, booking):

    request = request_factory.get(f"/koie/koie/booking/{booking.uuid}/")
    response = get_response(request=request, user=None)
    id = response.data[0]["uuid"]

    assert uuid.UUID(hex=id) == booking.uuid
    assert response.status_code == 200


@pytest.mark.django_db
def test_create_booking_not_logged_in(booking_data, request_factory, booking):

    request = request_factory.post(f"/koie/koie/booking/", booking_data)
    response = get_response(request=request)

    assert response.status_code == 403
    assert response.data["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
@pytest.mark.parametrize(
    "arrival_date, departure_date, expected",
    [
        (now().date(), now().date() + timedelta(days=2), 200),
        (now().date() + timedelta(days=5), now().date() + timedelta(days=7), 200),
        (now().date() + timedelta(days=16), now().date() + timedelta(days=19), 400),
        (now().date() + timedelta(days=-7), now().date() + timedelta(days=-5), 400),
    ],
)
def test_create_booking_dates(
    booking_data, request_factory, user, booking, arrival_date, departure_date, expected
):
    """
    A user can make a booking for a koie,
    should recieve a 200 SUCCESS response when booking is made.
    should recieve 400 if the data given is not valid for a booking
    """

    booking_data["arrival_date"] = arrival_date
    booking_data["departure_date"] = departure_date

    request = request_factory.post(f"/koie/koie/booking/", booking_data)
    response = get_response(request=request, user=user)

    assert response.status_code == expected


@pytest.mark.django_db
@pytest.mark.parametrize(
    "guests_member, guests_not_member, expected",
    [(1, 2, 200), (37, 2, 400), (0, 44, 400), (-4, 4, 400), (-17, 0, 400), (0, -4, 400)],
)
def test_create_booking_guests(
    booking_data, request_factory, booking, user, guests_member, guests_not_member, expected
):
    """
    A user can make a booking for a koie,
    should receive a 200 SUCCESS response when booking is made.
    should recieve 400 if the data given is not valid for a booking
    """
    factory.random.reseed_random("arbitrary_seed")

    booking_data["guests_member"] = guests_member
    booking_data["guests_not_member"] = guests_member

    request = request_factory.post(f"/koie/koie/booking/", booking_data)
    response = get_response(request=request, user=user)

    assert response.status_code == expected
