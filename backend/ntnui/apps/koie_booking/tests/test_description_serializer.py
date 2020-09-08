import pytest

from koie_booking.serializers.koie import DescriptionSerializer


@pytest.fixture
def serializer():
    return DescriptionSerializer()


@pytest.mark.django_db
def test_serializer_data_contains_expected_fields(serializer):
    data = serializer.data
    expected_fields = {
        "yr_link_nor",
        "yr_link_eng",
        "description_nor",
        "description_eng",
        "directions_nor",
        "directions_eng",
        "parking_nor",
        "parking_eng",
    }
    assert data.keys() == expected_fields
