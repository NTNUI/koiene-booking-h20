import factory.django

from accounts.factories.user_factory import UserFactory
from koie_booking.factories.booking_payment_factory import BookingPaymentFactory
from koie_booking.factories.koie_factory import KoieFactory
from koie_booking.models import BookingModel

from django.utils.timezone import now, timedelta


class BookingFactory(factory.DjangoModelFactory):
    class Meta:
        model = BookingModel

    user = factory.SubFactory(UserFactory)
    koie = factory.SubFactory(KoieFactory)
    arrival_date = now().date()
    departure_date = now().date() + timedelta(days=1)
    guests_member = 1
    guests_not_member = 2
    created = now()
    booking_payment = factory.SubFactory(BookingPaymentFactory)
