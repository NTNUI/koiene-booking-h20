import factory.django

from payments.models import StripeTransaction


class StripeTransactionFactory(factory.DjangoModelFactory):
    class Meta:
        model = StripeTransaction

    token_id = "dummy_token_id"
    charge_id = "dummy_charge_id"
