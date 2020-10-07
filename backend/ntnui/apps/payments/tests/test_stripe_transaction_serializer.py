import pytest
from rest_framework.exceptions import ValidationError

from payments.factories.stripe_transaction_factory import StripeTransactionFactory
from payments.serializers.stripe_transaction import StripeTransactionSerializer


@pytest.fixture()
def stripe_transaction():
    return StripeTransactionFactory()


@pytest.fixture()
def serializer(stripe_transaction):
    return StripeTransactionSerializer(stripe_transaction)


@pytest.mark.django_db
def test_serializer_data_contains_expected_fields(serializer):
    data = serializer.data
    expected_fields = {
        "token_id",
    }

    assert data.keys() == expected_fields


@pytest.mark.django_db
def test_serializer_without_token_id_is_invalid():

    serializer = StripeTransactionSerializer(data={})

    with pytest.raises(ValidationError):
        serializer.is_valid(raise_exception=True)
