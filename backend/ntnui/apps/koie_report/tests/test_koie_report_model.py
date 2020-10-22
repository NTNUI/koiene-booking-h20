import pytest

from groups.factories.group_factory import GroupFactory
from koie_report.factories.report_factory import ReportFactory
from django.template.defaultfilters import slugify


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture()
def koie_report():
    return ReportFactory(axe=1, hammer=1, spade=2)


@pytest.fixture
def expected_data():
    return {
        "0": [
            "gas_burner_primus",
            "saw",
            "saw_blade",
            "saw_bench",
            "kerosene_lamp",
            "detergent",
            "dishware",
            "cookware",
            "cabin_book",
            "candle_holders",
            "fire_blanket",
            "fire_extinguisher",
        ],
        "1": ["axe", "hammer"],
        "2": ["spade"],
    }


@pytest.mark.django_db
def test_get_sorted_equipment_status_returns_correct_grouping(koie_report, expected_data):
    """
    Tests helper function of report_model that counts equipment
    status and groups them into their respective answers
    """

    assert koie_report.get_sorted_equipment_status() == expected_data
