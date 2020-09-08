import factory.django

from accounts.models import UserModel


class UserFactory(factory.DjangoModelFactory):
    """Simplifies the construction of user objects"""

    class Meta:
        model = UserModel

    class Params:
        volunteer = False

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    email = factory.lazy_attribute(lambda user: f"{user.first_name}.{user.last_name}@mail.com")
    contact_email = factory.lazy_attribute(
        lambda user: f"{user.first_name}.{user.last_name}@ntnui.no".lower()
        if user.volunteer
        else None
    )
    phone_number = "+4712345678"

    password = "not_a_secret"
