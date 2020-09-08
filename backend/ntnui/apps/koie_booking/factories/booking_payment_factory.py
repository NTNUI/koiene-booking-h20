import factory.django

from koie_booking.models.booking_payment import BookingPayment
from payments.factories.stripe_transaction_factory import StripeTransactionFactory


class BookingPaymentFactory(factory.DjangoModelFactory):
    class Meta:
        model = BookingPayment

    transaction = factory.SubFactory(
        StripeTransactionFactory, payment_related_name="payments_membershippayment_related"
    )
    price = 160
