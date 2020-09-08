import phonenumbers
import pytest

from accounts.factories.user_factory import UserFactory
from groups.factories.membership_factory import MembershipFactory
from ntnui.enums import MembershipType


@pytest.fixture
def user():
    return UserFactory()


@pytest.mark.django_db
def test_get_full_name(user):
    """Should return first and last name."""
    expected_full_name = user.first_name.title() + " " + user.last_name.title()

    assert user.get_full_name() == expected_full_name


@pytest.mark.django_db
def test__str__is_equal_to_get_full_name(user):
    """Should be equal to first and last name."""

    assert str(user) == user.get_full_name()


@pytest.mark.django_db
def test_get_short_name(user):
    """Should return first name."""

    assert user.get_short_name() == user.first_name.title()


@pytest.mark.django_db
def test_get_contact_email_without_contact_email_set(user):
    """Should return email when contact email is not given."""
    assert user.get_contact_email() == user.email


@pytest.mark.django_db
def test_get_contact_email_with_contact_email_set(user):
    """Should return contact email when contact email is given"""
    updated_contact_email = "Sprint_contact@ntnui.no"
    user.contact_email = updated_contact_email

    actual_contact_email = user.get_contact_email()
    private_email = user.email

    assert actual_contact_email != private_email
    assert actual_contact_email == updated_contact_email


def test_that_gibberish_phone_number_evaluates_to_invalid():
    """ Gibberish phone numbers may be evaluated as invalid """
    gibberish_number = "+4711122333"
    user = UserFactory.build(phone_number=gibberish_number)

    assert not phonenumbers.is_valid_number(user.get_phone_number())


def test_that_valid_phone_number_is_registered_as_norwegian_by_default():
    """
        A valid norwegian phone number is automatically registered with +47 as country code.
    """
    valid_phone_number = "46513710"
    user_no = UserFactory.build(phone_number=valid_phone_number)
    expected_norwegian_phone_number = phonenumbers.parse(valid_phone_number, "NO")

    assert user_no.get_phone_number() == expected_norwegian_phone_number


@pytest.mark.parametrize(
    "membership_type, queried_membership_type, has_queried_membership",
    [
        (MembershipType.leader, MembershipType.leader, True),
        (MembershipType.deputy_leader, MembershipType.deputy_leader, True),
        (MembershipType.cashier, MembershipType.cashier, True),
        (MembershipType.leader, MembershipType.deputy_leader, False),
        (MembershipType.deputy_leader, MembershipType.cashier, False),
        (MembershipType.cashier, MembershipType.leader, False),
    ],
)
@pytest.mark.django_db
def test_user_has_membership(
    user, membership_type, queried_membership_type, has_queried_membership
):
    """Tests that the existence of a membership with a given type is evaluated correctly."""

    MembershipFactory(type=membership_type, member=user)
    assert user.has_membership(queried_membership_type) == has_queried_membership
