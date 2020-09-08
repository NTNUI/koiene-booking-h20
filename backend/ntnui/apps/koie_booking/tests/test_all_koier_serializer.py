import pytest

from koie_booking.serializers.all_koier import KoierSerializer


@pytest.fixture
def serializer():
    return KoierSerializer()


@pytest.mark.django_db
def test_serializer_data_contains_expected_fields(serializer):
    data = serializer.data
    expected_fields = {
        "name",
        "number_of_beds",
        "album",
    }
    assert data.keys() == expected_fields
