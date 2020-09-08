import pytest

from koie_booking.serializers.koie import LocationSerializer


@pytest.fixture
def serializer():
    return LocationSerializer()


@pytest.mark.django_db
def test_serializer_data_contains_expected_fields(serializer):
    data = serializer.data
    expected_fields = {
        "latitude",
        "longitude",
        "area",
        "difficulty_info_nor",
        "difficulty_info_eng",
        "terrain_nor",
        "terrain_eng",
        "altitude",
        "utm",
        "kartblad",
        "map_pdf",
    }
    assert data.keys() == expected_fields
