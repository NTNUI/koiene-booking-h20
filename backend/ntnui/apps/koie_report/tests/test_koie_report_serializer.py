from koie_report.report_serializer import ReportSerializer
from koie_booking.factories.booking_factory import BookingFactory
from koie_report.factories.report_factory import ReportFactory
from django.urls import reverse
# from rest_framework.exceptions import ValidationError
from django.utils.timezone import now
import pytest
# from rest_framework.test import Client
# client = Client()


@pytest.fixture()
def koie_report():
    return ReportFactory()


@pytest.fixture
def booking():
    return BookingFactory()


@pytest.fixture
def serializer(koie_report):
    return ReportSerializer(instance=koie_report)


@pytest.mark.django_db
def test_endpoint(client, koie_report):
    url = reverse('koie_create')
    response = client.post(url)
    assert response.status_code == 201


@pytest.fixture
def data(koie):
    return {
        {
            "booking": 1,
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
            "life_jackets_status": 0
        }
    }


@pytest.mark.django_db
def test_contains_expected_fields(serializer):
    expected_fields = {
        "date_created_at",
        "feedback",
        "firewood",
        "chopped_up_wood",
        "smoke_detector_is_working",
        "gas_is_full",
        "gas_burner_primus",
        "axe",
        "hammer",
        "saw",
        "saw_blade",
        "saw_bench",
        "spade",
        "kerosene_lamp",
        "detergent",
        "dishware",
        "cookware",
        "cabin_book",
        "candle_holders",
        "fire_blanket",
        "fire_extinguisher",
        "other_faults",
        "boat_status",
        "canoe_status",
        "life_jackets_status"
    }
    data = serializer.data
    assert data.keys() == expected_fields
