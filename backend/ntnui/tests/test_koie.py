import pytest
from rest_framework.test import APIRequestFactory, force_authenticate

from koie_booking.factories.koie_factory import DescriptionFactory, KoieFactory, LocationFactory
from koie_booking.models.koie import KoieModel
from koie_booking.views.koie import KoieViewSet


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


def get_response(request, user=None, koie=None):
    force_authenticate(request, user=user)

    if koie:
        view = KoieViewSet.as_view({"get": "retrieve"})
        return view(request, slug=koie.slug)

    else:
        view = KoieViewSet.as_view({"get": "list"})
        return view(request)


@pytest.mark.django_db
def test_list_koie(request_factory, koie):
    """ An anonymous user should be able to list all the koier """

    request = request_factory.get(f"/koie/koie/")
    response = get_response(request=request)
    assert len(response.data["koier"]) == KoieModel.objects.count()
    assert response.status_code == 200


@pytest.mark.django_db
def test_retrieve_as_anonymous_user(request_factory, koie):
    """ An anonymous user should be able to retrieve koie information """

    request = request_factory.get(f"/koie/koie/{koie.slug}/")
    response = get_response(request=request, user=None, koie=koie)

    assert response.status_code == 200


@pytest.mark.django_db
def test_retrieve_non_existing_koie(request_factory):
    """ Trying to fetch a non-existing koie should give a 404-NotFound response """

    view = KoieViewSet.as_view({"get": "retrieve"})

    request = request_factory.get(f"/koie/koie/dummyslug/")
    response = view(request, slug="dummyslug")

    assert response.status_code == 404
