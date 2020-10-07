import pytest
from django.utils.timezone import now, timedelta

from koie_booking.serializers.all_koier_detailed import (
    KoierDetailedSerializer,
    KoierDetailedRangeSerializer,
)
from koie_booking.factories.koie_factory import KoieFactory



@pytest.fixture()
def koie():
    return KoieFactory()


@pytest.fixture()
def detailed_serializer(koie):
    context = {"days": 5}
    return KoierDetailedSerializer(instance=koie, context=context)


@pytest.fixture()
def range_serializer(koie):
    context = {}
    from_date = now().date()
    to_date = from_date + timedelta(days=5)
    context["from_date"] = from_date.isoformat()
    context["to_date"] = to_date.isoformat()
    return KoierDetailedRangeSerializer(koie, context=context)


@pytest.mark.django_db
def test_detailed_serializer_data_contains_expected_fields(detailed_serializer):
    data = detailed_serializer.data
    expected_fields = {
        "name",
        "slug",
        "number_of_beds",
        "booking_window",
        "beds_available_in_next_days",
    }
    assert data.keys() == expected_fields


@pytest.mark.django_db
def test_range_serializer_data_contains_expected_fields(range_serializer):
    data = range_serializer.data
    expected_fields = {
        "name",
        "slug",
        "number_of_beds",
        "booking_window",
        "beds_available_in_date_range",
    }
    assert data.keys() == expected_fields
