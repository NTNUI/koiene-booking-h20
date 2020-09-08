import factory.django

from koie_booking.factories.description_factory import DescriptionFactory
from koie_booking.factories.location_factory import LocationFactory
from koie_booking.models import KoieModel


class KoieFactory(factory.DjangoModelFactory):
    """Simplifies construction of a koie object """

    class Meta:
        model = KoieModel

    name = "Flåkoia"
    price_member = 40
    price_not_member = 80
    number_of_beds = 11
    booking_window = 14
    description = factory.SubFactory(DescriptionFactory)
    location = factory.SubFactory(LocationFactory)
