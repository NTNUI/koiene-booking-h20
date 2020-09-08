from unittest.mock import patch

import pytest
from rest_framework.test import APIRequestFactory, force_authenticate

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory
from payments.models import StripeTransaction
from payments.views.stripe_transaction import StripeTransactionViewSet


@pytest.fixture(autouse=True)
def koie_group():
    """ Creating group fixture for Koiene, as this specific group is used in the booking payment """
    return GroupFactory(name="Koiene")


@pytest.fixture()
def request_factory():
    return APIRequestFactory()


@pytest.fixture()
def user():
    return UserFactory()


@pytest.mark.django_db
@pytest.fixture(params=["booking_payment"])
def stripe_transaction(request):
    """
    A StripeTransaction needs to be connected to a payment-object to be able to communicate
    with Stripe. The payment key is stored on the seller-object, and is accessed through the
    payment-object.
    As a payment-object automatically creates it´s own StripeTransaction, the only way to create a
    StripeTransaction with a connected payment-object is to create the payment-object and
    then extract the StripeTransaction-object.

    StripeTransaction should be agnostic to the actual implementation of the object, as long as
    it is a valid payment-object. To test multiple payment-object one can add additional params
    in the fixture decorator and expand the if-statement below with a new factory.
    """

    if request.param == "booking_payment":
        payment_object = BookingFactory().booking_payment
    else:
        raise ValueError(f"{request.param} is not a valid payment object")

    transaction = payment_object.transaction
    transaction.token_id = None
    transaction.charge_id = ""

    return transaction


def get_response(request, pk, user=None):
    """
    Converts a request to a response for .

    :param request: the desired HTTP-request.
    :param pk: the primary key of the transaction
    :param user: the user performing the request. None represents an anonymous user
    :return the HTTP-response from Django.
    """

    force_authenticate(request, user=user)

    view = StripeTransactionViewSet.as_view({"put": "update", "patch": "partial_update"})
    return view(request, pk)


@patch("stripe.Charge.create")
@pytest.mark.django_db
def test_update_stripe_transaction_as_anonymous_user(
    mock_stripe_charge_create, request_factory, stripe_transaction
):

    mock_stripe_charge_create.return_value = {"id": "dummy_charge"}

    stripe_transaction.token_id = ""
    stripe_transaction.save()
    data = {"token_id": "test_token_id"}

    request = request_factory.put(f"payment/stripetransaction/{stripe_transaction.pk}", data=data)
    response = get_response(request, stripe_transaction.pk)

    stripe_transaction.refresh_from_db()

    assert mock_stripe_charge_create.called
    assert response.status_code == 200
    assert stripe_transaction.token_id == data["token_id"]
    assert stripe_transaction.charge_id == "dummy_charge"


@patch("stripe.Charge.create")
@pytest.mark.django_db
def test_update_stripe_transaction_as_user(
    mock_stripe_charge_create, request_factory, stripe_transaction, user
):

    mock_stripe_charge_create.return_value = {"id": "dummy_charge"}

    stripe_transaction.token_id = ""
    stripe_transaction.save()
    data = {"token_id": "test_token_id"}

    request = request_factory.put(f"payment/stripetransaction/{stripe_transaction.pk}", data=data)
    response = get_response(request, stripe_transaction.pk, user=user)

    stripe_transaction.refresh_from_db()

    assert response.status_code == 200
    assert stripe_transaction.token_id == data["token_id"]


@patch("stripe.Charge.create")
@pytest.mark.django_db
def test_update_stripe_transaction_charge_id_fails(
    mock_stripe_charge_create, request_factory, stripe_transaction, user
):

    mock_stripe_charge_create.return_value = {"id": "charge_id_retrieved_from_stripe"}

    stripe_transaction.token_id = ""
    stripe_transaction.save()
    data = {"token_id": "test_token_id", "charge_id": "fake_charge_id"}

    request = request_factory.put(f"payment/stripetransaction/{stripe_transaction.pk}", data=data)
    response = get_response(request, stripe_transaction.pk, user=user)

    stripe_transaction.refresh_from_db()

    assert stripe_transaction.charge_id == "charge_id_retrieved_from_stripe"
    assert response.data["detail"] == "created"
    assert response.status_code == 200


@pytest.mark.django_db
def test_update_stripe_transaction_for_non_existing_object(request_factory, user):

    assert StripeTransaction.objects.count() == 0

    request = request_factory.put(f"payment/stripetransaction/{1}")
    response = get_response(request, 1, user=user)

    assert response.status_code == 400
    assert response.data["detail"] == "Could not find transaction"


@pytest.mark.django_db
def test_patch_stripe_transaction_fails_for_patch(request_factory, stripe_transaction):

    request = request_factory.patch(f"payment/stripetransaction/{stripe_transaction.pk}")
    response = get_response(request, stripe_transaction.pk)

    assert response.status_code == 501


@pytest.mark.django_db
def test_update_stripe_transaction_without_valid_payment_key_returns_stripe_error_message(
    request_factory, stripe_transaction
):

    stripe_transaction.token_id = ""
    stripe_transaction.save()
    data = {"token_id": "test_token_id"}

    request = request_factory.put(f"payment/stripetransaction/{stripe_transaction.pk}", data=data)
    response = get_response(request, stripe_transaction.pk, user=user)

    assert response.status_code == 400
    assert response.data["detail"] == "Could not communicate with payment server"


@pytest.mark.django_db
def test_update_stripe_transaction_without_token_id_returns_error_message(
    request_factory, stripe_transaction
):

    data = {"token_id": ""}

    request = request_factory.put(f"payment/stripetransaction/{stripe_transaction.pk}", data=data)
    response = get_response(request, stripe_transaction.pk, user=user)

    assert response.status_code == 400
    assert response.data[0] == "A token must be included to create a Stripe charge"


@pytest.mark.django_db
def test_update_stripe_transaction_with_existing_token_id_returns_bad_request(
    request_factory, stripe_transaction
):

    stripe_transaction.token_id = "dummy_token"
    stripe_transaction.save()
    stripe_transaction.refresh_from_db()
    data = {"token_id": "duplicate_id"}

    request = request_factory.put(f"payment/stripetransaction/{stripe_transaction.pk}", data=data)
    response = get_response(request, stripe_transaction.pk, user=user)

    assert response.status_code == 400
    assert response.data[0] == "A token from Stripe is already connected to this object"
