import factory.django
from slugify import slugify

from groups.models import GroupModel


class GroupFactory(factory.DjangoModelFactory):
    """Simplifies construction of a group object """

    class Meta:
        model = GroupModel

    name = factory.Iterator(["Aikido", "American Football", "Volleyball"])
    slug = factory.lazy_attribute(lambda group: slugify(group.name, to_lower=True))

    access = "O"
    payment_key = "some-random-payment_key"

