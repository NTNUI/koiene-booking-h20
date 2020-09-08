import factory.random
import pytest

from accounts.factories.user_factory import UserFactory

# Pass in any value to create consistent random data
factory.random.reseed_random("arbitrary_seed")


@pytest.mark.django_db
def test_user_factory():
    """ Tests the user factory construction of a random user """
    user = UserFactory()

    assert user.email == f"{user.first_name}.{user.last_name}@mail.com"
    assert user.contact_email is None


@pytest.mark.django_db
def test_volunteer_factory():
    """Tests the user factory construction with parameter volunteer """
    volunteer = UserFactory(volunteer=True)

    assert volunteer.email == f"{volunteer.first_name}.{volunteer.last_name}@mail.com"
    assert (
        volunteer.contact_email == f"{volunteer.first_name}.{volunteer.last_name}@ntnui.no".lower()
    )
