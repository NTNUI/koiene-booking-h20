import pytest
from rest_framework.test import APIRequestFactory, force_authenticate

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from groups.factories.membership_factory import BoardMembershipFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_report.factories.report_factory import ReportFactory
from koie_report.views import ReportViewSet


@pytest.fixture()
def request_factory():
    return APIRequestFactory()


@pytest.fixture
def user(autouse=True):
    return UserFactory()


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture
def other_group():
    return GroupFactory()


@pytest.fixture
def board_membership(user, koie_group):
    return BoardMembershipFactory(member=user, group=koie_group)


@pytest.fixture
def other_board_membership(user, other_group):
    return BoardMembershipFactory(member=user, group=other_group)


@pytest.fixture
def koie():
    return KoieFactory()


@pytest.fixture
def bookingless_koie():
    return KoieFactory(name="Mevasskoia")


@pytest.fixture
def booking(koie):
    return BookingFactory(koie=koie)


@pytest.fixture()
def koie_report(booking):
    return ReportFactory(booking=booking)


@pytest.fixture
def invalid_report_data():
    data = {
        "feedback": "No feedback needed..",
        "firewood": 1,
        "chopped_up_wood": 2,
        "smoke_detector_is_working": True,
        "gas_is_full": False,
        "gas_burner_primus": 4,
        "axe": 2,
        "hammer": 1,
        "saw": 3,
        "saw_blade": 0,
        "saw_bench": 0,
        "spade": 0,
        "kerosene_lamp": 0,
        "detergent": 0,
        "dishware": 0,
        "cookware": 0,
        "cabin_book": 2,
        "candle_holders": 0,
        "fire_blanket": 0,
        "fire_extinguisher": 0,
        "other_faults": " ",
        "boat_status": 2,
        "canoe_status": 0,
        "life_jackets_status": 0,
    }

    return data


@pytest.fixture
def valid_report_data():
    data = {
        "feedback": "Don't have any feedback",
        "firewood": 4,
        "chopped_up_wood": 3,
        "smoke_detector_is_working": True,
        "gas_is_full": True,
        "gas_burner_primus": 2,
        "axe": 2,
        "hammer": 1,
        "saw": 1,
        "saw_blade": 0,
        "saw_bench": 0,
        "spade": 0,
        "kerosene_lamp": 0,
        "detergent": 0,
        "dishware": 0,
        "cookware": 0,
        "cabin_book": 2,
        "candle_holders": 0,
        "fire_blanket": 0,
        "fire_extinguisher": 0,
        "other_faults": "No other faults.",
        "boat_status": 1,
        "canoe_status": 0,
        "life_jackets_status": 0,
    }

    return data


def get_response(request, user=None, booking_uuid=None, koie_slug=None):
    force_authenticate(request_factory, user=user)
    if booking_uuid:
        view = ReportViewSet.as_view({"post": "create"})
        return view(request, booking_uuid)
    else:
        view = ReportViewSet.as_view({"get": "list"})
        return view(request, koie_slug)


@pytest.mark.django_db
def test_create_report_with_invalid_data(request_factory, booking, invalid_report_data):
    """
    Tests that the response returns bad request (status code 400) when invalid
    data is passed in
    """
    request = request_factory.post(f"/koie/reports/{booking.uuid}", invalid_report_data)
    response = get_response(request=request, booking_uuid=booking.uuid)
    assert response.status_code == 400


@pytest.mark.django_db
def test_create_report_with_valid_data(request_factory, booking, valid_report_data):
    """
    Test successfull post request when valid data are passed in.
    """
    request = request_factory.post(f"/koie/reports/{booking.uuid}", valid_report_data)
    response = get_response(request=request, booking_uuid=booking.uuid)
    assert response.status_code == 201


@pytest.mark.django_db
def test_reports_list_succeeds_as_koie_admin(request_factory, user, board_membership, koie_report):
    """
    Tests that a koie admin (board member and member of koie group) has
    access to report information
    """
    slug = "flakoia"
    request = request_factory.get(f"/koie/reports/{slug}")
    force_authenticate(request, user=user)
    response = get_response(request=request, user=user, koie_slug=slug)

    assert response.status_code == 200


@pytest.mark.django_db
def test_reports_list_denied_for_anonymous_user(request_factory, koie):
    """
    Tests anonymous user does not get access to report data
    """
    request = request_factory.get(f"/koie/reports/{koie.slug}")
    response = get_response(request=request, koie_slug=koie.slug)

    assert response.status_code == 403


@pytest.mark.django_db
def test_reports_list_denied_for_other_board_member(
    request_factory, koie, user, other_board_membership
):
    """
    Tests board member from other group than koiene does not get access to report data
    """
    request = request_factory.get(f"/koie/reports/{koie.slug}")
    force_authenticate(request, user=user)
    response = get_response(request=request, koie_slug=koie.slug)

    assert response.status_code == 403


@pytest.mark.django_db
def test_reports_list_should_return_404_if_koie_not_found(request_factory, user, board_membership):
    """
    Method should return 404 if there is no koie with given slug
    """

    request = request_factory.get("/koie/reports/404koia")
    force_authenticate(request, user=user)
    response = get_response(request=request, user=user, koie_slug="404koia")

    assert response.status_code == 404


@pytest.mark.django_db
def test_reports_list_should_return_404_if_no_reports_exist_for_given_koie(
    request_factory, user, board_membership, bookingless_koie
):
    """
    Method should return 404 if there does not exist any reports for given koie
    """

    request = request_factory.get(f"/koie/reports/{bookingless_koie.slug}")
    force_authenticate(request, user=user)
    response = get_response(request=request, user=user, koie_slug=bookingless_koie.slug)

    assert response.status_code == 404
