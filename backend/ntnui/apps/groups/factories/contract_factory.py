from datetime import date

import factory

from accounts.factories.user_factory import UserFactory
from accounts.models import Contract


class ContractFactory(factory.DjangoModelFactory):
    class Meta:
        model = Contract

    user = factory.SubFactory(UserFactory)
    expiry_date = date.today()
