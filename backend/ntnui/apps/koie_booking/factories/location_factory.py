import factory.django

from koie_booking.models import Location


class LocationFactory(factory.DjangoModelFactory):
    class Meta:
        model = Location
