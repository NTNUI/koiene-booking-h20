import pytest
from rest_framework.test import APIRequestFactory, force_authenticate

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from groups.factories.membership_factory import BoardMembershipFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_report.factories.report_factory import ReportFactory
from koie_report.report_serializer import ReportSerializer
from koie_report.views import ReportViewSet


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture
def koie():
    return KoieFactory()


@pytest.fixture
def booking():
    return BookingFactory()


@pytest.fixture()
def koie_report():
    return ReportFactory()


@pytest.fixture
def serializer(koie_report):
    return ReportSerializer(instance=koie_report)


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


@pytest.fixture
def user(autouse=True):
    return UserFactory()


@pytest.fixture
def board_membership(user, koie_group):
    return BoardMembershipFactory(member=user, group=koie_group)


@pytest.fixture()
def request_factory():
    return APIRequestFactory()


def get_response(request, user=None, booking_id=None):
    force_authenticate(request_factory, user=user)
    if booking_id:
        view = ReportViewSet.as_view({"post": "create"})
        return view(request, booking_id)
    else:
        view = ReportViewSet.as_view({"get": "list"})

        return view(request)


@pytest.mark.django_db
def test_create_report_with_invalid_data(request_factory, booking, invalid_report_data):
    """
    Tests that the response returns bad request (status code 400) when invalid
    data is passed in
    """
    request = request_factory.post(f"/koie/reports/{booking.id}", invalid_report_data)
    response = get_response(request=request, booking_id=booking.id)
    assert response.status_code == 400


@pytest.mark.django_db
def test_create_report_with_valid_data(request_factory, booking, valid_report_data):
    """
    Test successfull post request when valid data are passed in.
    """
    request = request_factory.post(f"/koie/reports/{booking.id}", valid_report_data)
    response = get_response(request=request, booking_id=booking.id)
    assert response.status_code == 201


@pytest.mark.django_db
def test_list_report_succeeds_as_koie_admin(request_factory, user, board_membership):
    """
    Tests that a koie admin (board member and member of koie group) has
    access to report information
    """

    request = request_factory.get("/koie/reports/")
    force_authenticate(request, user=user)
    response = get_response(request=request, user=user)
    assert response.status_code == 200


@pytest.mark.django_db
def test_list_reports_denied_for_not_koie_admin_user(request_factory):
    """
    Tests non authorized user who is not a koie admin gets access to report data
    """
    request = request_factory.get("/koie/reports/")
    response = get_response(request=request)
    assert response.status_code == 403
