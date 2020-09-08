import pytest

from koie_booking.serializers.koie import KoieSerializer


@pytest.fixture
def serializer():
    return KoieSerializer()


@pytest.mark.django_db
def test_serializer_data_contains_expected_fields(serializer):
    data = serializer.data
    expected_fields = {
        "booking_window",
        "name",
        "price_member",
        "price_not_member",
        "number_of_beds",
        "koie_type",
        "difficulty",
        "album",
        "description",
        "location",
    }
    assert data.keys() == expected_fields
