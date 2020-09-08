import factory.django

from koie_booking.models import Description


class DescriptionFactory(factory.DjangoModelFactory):
    class Meta:
        model = Description
