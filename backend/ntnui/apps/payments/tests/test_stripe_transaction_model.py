from unittest.mock import patch

import pytest
from rest_framework.exceptions import ValidationError

from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory


@pytest.fixture(autouse=True)
def koie_group():
    """ Creating group fixture for Koiene, as this specific group is used in the booking payment """
    return GroupFactory(name="Koiene")


@pytest.fixture(params=["booking_payment"])
@pytest.mark.django_db()
def stripe_transaction(request):
    """
    A StripeTransaction needs to be connected to a payment-object to be able to communicate
    with Stripe. The payment key is stored on the seller-object, and is accessed through the
    payment-object.

    As a payment-object automatically creates it´s own StripeTransaction, the only way to create a
    StripeTransaction with a connected payment-object is to create the payment-object and then
    extract the StripeTransaction-object.

    StripeTransaction should be agnostic to the actual implementation of the object, as long as it
    is a valid payment-object. To test multiple payment-object one can add additional params in
    the fixture decorator and expand the if-statement below with a new factory.
    """

    if request.param == "booking_payment":
        payment_object = BookingFactory().booking_payment
    else:
        raise ValueError(f"{request.param} is not a valid payment object")

    return payment_object.transaction

@pytest.mark.django_db()
def test_stripe_transaction_has_default_stripe_status(stripe_transaction):

    assert stripe_transaction.stripe_status == "created"


@pytest.mark.django_db()
def test_is_paid_returns_true_when_stripe_status_is_succeeded(stripe_transaction):

    stripe_transaction.stripe_status = "succeeded"

    assert stripe_transaction.is_paid()


@pytest.mark.django_db()
def test_is_paid_returns_false_without_token_id(stripe_transaction):

    stripe_transaction.token_id = None

    assert not stripe_transaction.is_paid()


@patch("stripe.Charge.retrieve")
@pytest.mark.django_db()
def test_is_paid_initiates_stripe_request(mock_stripe_charge_retrieve, stripe_transaction):

    mock_stripe_charge_retrieve.return_value = {"status": "succeeded"}

    stripe_transaction.token_id = "dummy_token"
    stripe_transaction.charge_id = "dummy_token"

    assert stripe_transaction.is_paid()
    assert mock_stripe_charge_retrieve.called


@pytest.mark.django_db()
def test_is_paid_returns_none_if_stripe_request_fails(stripe_transaction):
    """
    Default values for StripeTransaction is an unpaid, but created transaction. This will lead to
    a request to Stripe to check for updates. The test seller has only a dummy payment key,
    so a StripeErrorAuthentication will be raised in retrieve_charge_from_stripe().

    This exception should be caught in is_paid to ensure that the program won´t crash in the
    admin panel. As the payment status is not known, the function should should return None
    """

    stripe_transaction.token_id = "dummy_token"
    stripe_transaction.charge_id = "dummy_token"

    assert stripe_transaction.is_paid() is None


@pytest.mark.django_db()
@pytest.mark.parametrize(("token_id", "charge_id"), [("", "dummy_charge"), ("dummy_token", "")])
def test_try_to_retrieve_charge_from_stripe_raises_error(stripe_transaction, token_id, charge_id):

    stripe_transaction.token_id = token_id
    stripe_transaction.charge_id = charge_id
    stripe_transaction.save()

    with pytest.raises(ValidationError):
        stripe_transaction.try_to_retrieve_charge_from_stripe()


@patch("stripe.Charge.retrieve")
@pytest.mark.django_db()
def test_try_to_retrieve_charge_from_stripe_initiates_stripe_request(
    mock_stripe_charge_retrieve, stripe_transaction
):
    stripe_transaction.token_id = "dummy_token"
    stripe_transaction.charge_id = "dummy_token"
    stripe_transaction.try_to_retrieve_charge_from_stripe()
    assert mock_stripe_charge_retrieve.called


@pytest.mark.django_db()
def test_try_to_create_charge_on_stripe_without_token_id_argument_raises_error(stripe_transaction):
    stripe_transaction.token_id = "dummy_token"
    stripe_transaction.charge_id = "dummy_token"
    with pytest.raises(ValidationError):
        stripe_transaction.try_to_create_charge_on_stripe(token_id=None)


@pytest.mark.django_db()
def test_try_to_create_charge_on_stripe_with_existing_token_id_raises_error(stripe_transaction):

    stripe_transaction.token_id = "dummy_token"
    stripe_transaction.charge_id = "dummy_token"

    with pytest.raises(ValidationError):
        stripe_transaction.try_to_create_charge_on_stripe(token_id="test_token")


@pytest.mark.django_db()
def test_try_to_create_charge_on_stripe_with_charge_id_raises_error(stripe_transaction):
    stripe_transaction.token_id = "dummy_token"
    stripe_transaction.charge_id = "dummy_token"
    with pytest.raises(ValidationError):
        stripe_transaction.try_to_create_charge_on_stripe(token_id="test_token")


@patch("payments.models.StripeTransaction.create_charge_on_stripe")
@pytest.mark.django_db()
def test_try_to_create_charge_on_stripe_initiates_stripe_request(
    mock_create_charge_on_stripe, stripe_transaction
):

    stripe_transaction.token_id = ""
    stripe_transaction.charge_id = ""

    stripe_transaction.try_to_create_charge_on_stripe(token_id="test_token")
    assert mock_create_charge_on_stripe.called
