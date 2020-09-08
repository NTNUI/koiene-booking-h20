import factory

from groups.factories.membership_factory import MembershipFactory
from groups.models.responsibility import ResponsibilityModel, ResponsibilityType


class ResponsibilityFactory(factory.DjangoModelFactory):
    class Meta:
        model = ResponsibilityModel

    membership = factory.SubFactory(MembershipFactory)
    type = ResponsibilityType.it
