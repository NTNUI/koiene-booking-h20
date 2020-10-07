import pytest
from rest_framework.test import APIRequestFactory, force_authenticate

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_report.factories.report_factory import ReportFactory
from koie_report.report_serializer import ReportSerializer
from koie_report.views import ReportViewSet

from django.utils.timezone import now


@pytest.fixture
def user():
    return UserFactory()


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
def report_data():
    data = {
        "date_created_at": now(),
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


@pytest.fixture()
def request_factory():
    return APIRequestFactory()


def get_response(request, user=None, booking_id=None):
    force_authenticate(request, user=user)
    if booking_id:
        view = ReportViewSet.as_view({"post": "create"})
        return view(request, booking_id)
    else:
        view = ReportViewSet.as_view({"get": "list"})
        return view(request)


@pytest.fixture()
def report_batch(booking):
    return ReportFactory.create_batch(4, booking=booking)


@pytest.mark.django_db
def test_list_report(request_factory, report_batch):

    request = request_factory.get("/koie/reports/")
    response = get_response(request=request)
    assert response.status_code == 200
    assert len(response.data) == len(report_batch)
