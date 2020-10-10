import pytest
from rest_framework.test import APIRequestFactory, force_authenticate

from koie_booking.factories.koie_factory import DescriptionFactory, KoieFactory, LocationFactory
from koie_booking.models.koie import KoieModel
from koie_booking.views.koie_dashboard import KoieDashboardViewSet

from django.utils.timezone import now, timedelta


@pytest.fixture()
def request_factory():
    return APIRequestFactory()


@pytest.fixture()
def koie():
    return KoieFactory()


@pytest.fixture()
def description():
    return DescriptionFactory()


@pytest.fixture()
def location():
    return LocationFactory()


def get_response(request, user=None, range=None):
    force_authenticate(request, user=user)

    if range:
        view = KoieDashboardViewSet.as_view({"get": "range"})
        return view(request)
    else:
        view = KoieDashboardViewSet.as_view({"get": "list"})
        return view(request)


@pytest.mark.django_db
def test_list_koie_availability_for_next_days(request_factory, koie):
    """ An admin should be able to list koie availability for the next couple of days """

    request = request_factory.get(f"/koie/availability/?days=4")
    response = get_response(request=request)

    bed_availability = response.data["koier"][0]["beds_available_in_date_range"]

    assert len(response.data["koier"]) == KoieModel.objects.count()
    assert len(bed_availability) == 4
    assert response.status_code == 200


@pytest.mark.django_db
def test_list_koie_availability_from_date_range(request_factory, koie):
    """ An admin should be able to list koie availability for given date range """

    from_date = now().date().isoformat()
    to_date = (now().date() + timedelta(days=14)).isoformat()

    request = request_factory.get(
        f"/koie/availability/range/?from_date={from_date}&to_date={to_date}"
    )
    response = get_response(request=request)
    bed_availability = response.data["koier"][0]["beds_available_in_date_range"]

    assert len(response.data["koier"]) == KoieModel.objects.count()
    assert len(bed_availability) == 14
    assert response.status_code == 200
