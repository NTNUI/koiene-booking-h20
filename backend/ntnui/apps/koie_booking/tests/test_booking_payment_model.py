from datetime import timedelta

import pytest
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as RestValidationError

from groups.factories.group_factory import GroupFactory
from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.models.booking_payment import BookingPayment
from payments.models.stripe_transaction import StripeTransaction

from django.utils import timezone


@pytest.fixture(autouse=True)
def koie_group():
    return GroupFactory(name="Koiene")


@pytest.fixture()
def payment():
    return BookingFactory().booking_payment


@pytest.mark.django_db()
def test_is_paid(payment):

    assert not payment.is_paid()


@pytest.mark.django_db
def test_that_payment_is_paid(payment):
    payment.transaction.stripe_status = "succeeded"
    assert payment.is_paid()


@pytest.mark.django_db
def test_that_payment_transaction_is_created(payment):
    assert payment.transaction


@pytest.mark.django_db
def test_get_price_in_nok(payment):

    assert payment.get_price_in_nok()


@pytest.mark.django_db
@pytest.mark.parametrize("price", [0, -300])
def test_that_payment_cannot_be_created_with_non_positive_price(price):

    with pytest.raises(RestValidationError):
        BookingPayment.objects.create(price=price)

    assert not StripeTransaction.objects.exists()


@pytest.mark.django_db
def test_get_price_in_ore(payment):

    assert payment.get_price_in_nok() >= 0


@pytest.mark.django_db
def test_get_buyer(payment):

    assert payment.get_buyer()


@pytest.mark.django_db
def test_get_seller(payment):

    assert payment.get_seller()


@pytest.mark.django_db
def test_get_payment_key(payment):

    assert payment.get_payment_key()


@pytest.mark.django_db
def test_str_representation(payment):

    assert (
        str(payment) == f"Payment for booking {payment.booking.uuid} from {payment.get_buyer()}"
        f" to {payment.get_seller()}"
    )


@pytest.mark.django_db
def test_validate_raises_error(payment):
    payment.booking.created = timezone.now() - timedelta(minutes=41)
    with pytest.raises(ValidationError):
        payment.validate()
