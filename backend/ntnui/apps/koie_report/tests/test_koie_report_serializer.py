import pytest
from koie_report.report_serializer import ReportSerializer
from koie_booking.factories.booking_factory import BookingFactory
from koie_report.factories.report_factory import ReportFactory
from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from koie_booking.factories.koie_factory import KoieFactory


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


@pytest.mark.django_db
def test_contains_expected_fields(serializer):
    expected_fields = {
        "id", "booking",
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
