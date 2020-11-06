import uuid

import pytest
from rest_framework.test import APIRequestFactory, force_authenticate

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from groups.factories.membership_factory import BoardMembershipFactory, MembershipFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_booking.views.booking_sit import BookingSitViewSet


@pytest.fixture()
def user():
    return UserFactory()


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture(autouse=True)
def sit_group():
    return GroupFactory(name="SiT")


@pytest.fixture()
def other_group():
    return GroupFactory()


@pytest.fixture
def sit_membership(user, sit_group):
    return MembershipFactory(member=user, group=sit_group)


@pytest.fixture
def koie_membership(user, koie_group):
    return MembershipFactory(member=user, group=koie_group)


@pytest.fixture
def other_membership(user, other_group):
    return MembershipFactory(member=user, group=other_group)


@pytest.fixture
def koie_board_membership(user, koie_group):
    return BoardMembershipFactory(member=user, group=koie_group)


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
        "key_status": booking.key_status,
    }


@pytest.fixture()
def request_factory():
    return APIRequestFactory()


def get_response(request, user=None, uuid=None, key_status_change=None):
    force_authenticate(request=request, user=user)

    if key_status_change and uuid:
        view = BookingSitViewSet.as_view({"patch": "partial_update"})
        return view(request, uuid=uuid)
    elif uuid:
        view = BookingSitViewSet.as_view({"get": "retrieve",})
        return view(request, uuid=uuid)
    else:
        view = BookingSitViewSet.as_view({"get": "list"})
        return view(request)


@pytest.mark.django_db
def test_list_booking_success_if_sit_member(request_factory, user, booking_batch, sit_membership):

    request = request_factory.get(f"/koie/sit")
    response = get_response(request=request, user=sit_membership.member)

    first_id = response.data[0]["uuid"]

    assert response.status_code == 200
    assert len(response.data) == 3
    assert uuid.UUID(hex=first_id) == booking_batch[0].uuid


@pytest.mark.django_db
def test_retrieve_booking_from_uuid_success_if_sit_member(
    request_factory, user, booking, sit_membership
):

    request = request_factory.get(f"/koie/sit/{booking.uuid}")
    response = get_response(request=request, user=sit_membership.member, uuid=booking.uuid)
    id = response.data["uuid"]

    assert uuid.UUID(hex=id) == booking.uuid
    assert response.status_code == 200


@pytest.mark.django_db
def test_retrieve_booking_from_uuid_success_if_koie_admin(
    request_factory, user, booking, koie_board_membership
):

    request = request_factory.get(f"/koie/sit/{booking.uuid}")
    response = get_response(request=request, user=koie_board_membership.member, uuid=booking.uuid)
    id = response.data["uuid"]

    assert uuid.UUID(hex=id) == booking.uuid
    assert response.status_code == 200


@pytest.mark.django_db
def test_list_booking_regular_koie_member_should_fail(
    request_factory, booking, user, koie_membership
):

    request = request_factory.get(f"/koie/sit")
    response = get_response(request=request, user=koie_membership.member)

    assert response.status_code == 403


@pytest.mark.django_db
def test_list_booking_regular_user_should_fail(request_factory, booking, user, other_membership):
    request = request_factory.get(f"/koie/sit")
    response = get_response(request=request, user=other_membership.member)

    assert response.status_code == 403


@pytest.mark.django_db
def test_list_booking_not_logged_in_should_fail(request_factory, booking):

    request = request_factory.get(f"/koie/sit")
    response = get_response(request=request)

    assert response.status_code == 403
    assert response.data["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_retrieve_booking_not_logged_in_should_fail(request_factory, booking):

    request = request_factory.get(f"/koie/sit/{booking.uuid}")
    response = get_response(request=request, uuid=booking.uuid)

    assert response.status_code == 403
    assert response.data["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_change_key_status_not_logged_in_should_fail(request_factory, booking):

    booking_data = {"koie": booking.koie.slug, "key_status": "delivered"}

    request = request_factory.patch(f"/koie/sit/?uuid={booking.uuid}", booking_data)
    response = get_response(request=request, uuid=booking.uuid, key_status_change=True)

    assert response.status_code == 403
    assert response.data["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
@pytest.mark.parametrize(
    "key_status, expected",
    [("picked_up", 200), ("delivered", 200), ("picked up", 400), ("12341", 400)],
)
def test_change_key_status_valid_status(
    request_factory, booking, user, sit_membership, key_status, expected
):
    """
    A sit-user can change key-status of booking,
    should receive a 200 SUCCESS response when key-status is done.
    Key_status should then be changed.
    Should return 400 on invalid key_status.
    Key_status should then not be changed.
    """
    booking_data = {"koie": booking.koie.slug, "key_status": key_status}

    request = request_factory.patch(f"/koie/sit/?uuid={booking.uuid}", booking_data)
    response = get_response(
        request=request, user=sit_membership.member, uuid=booking.uuid, key_status_change=True
    )

    assert response.status_code == expected

    request = request_factory.get(f"/koie/sit/{booking.uuid}/")
    response = get_response(request=request, user=sit_membership.member)

    response_key_status = response.data[0]["key_status"]

    if expected == 200:
        assert response_key_status == key_status
    else:
        assert response_key_status == "not_picked_up"
