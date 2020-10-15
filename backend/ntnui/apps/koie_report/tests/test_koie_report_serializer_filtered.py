import pytest

from groups.factories.group_factory import GroupFactory
from koie_report.factories.report_factory import ReportFactory
from koie_report.report_serializer import FilteredReportSerializer


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture()
def koie_report():
    return ReportFactory()


@pytest.fixture
def serializer(koie_report):
    return FilteredReportSerializer(instance=koie_report)


@pytest.mark.django_db
def test_contains_expected_fields(serializer):
    expected_fields = {
        "id",
        "date_created_at",
        "koie_name",
        "date_of_stay",
        "gas_is_full",
        "firewood",
        "chopped_up_wood",
        "boat_status",
        "canoe_status",
        "life_jackets_status",
        "smoke_detector_is_working",
        "equipment_status",
        "other_faults",
        "feedback",
    }

    data = serializer.data
    assert data.keys() == expected_fields
