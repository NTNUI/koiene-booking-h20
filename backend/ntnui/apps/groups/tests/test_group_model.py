from datetime import date, timedelta

import pytest

from groups.factories.group_factory import GroupFactory
from groups.factories.membership_factory import MembershipFactory
from ntnui.enums import GroupCategory


@pytest.fixture
def group():
    """ Return a default group """

    return GroupFactory()


@pytest.mark.django_db
def test_group_has_default_founding_date(group):

    assert group.founding_date == date.today()


@pytest.mark.django_db
def test_group_can_update_founding_date(group):
    """ Ensure that we can also change the founding date """

    yesterday = date.today() - timedelta(days=1)

    group.founding_date = yesterday

    assert group.founding_date == yesterday


@pytest.mark.django_db
@pytest.mark.parametrize(
    ("name", "expected"),
    [
        ("Sprint", "sprint"),
        ("Håndball", "handball"),
        ("Ski og Fjellsport", "ski-og-fjellsport"),
        ("Svømming", "svomming"),
    ],
)
def test_group_slug_is_correct(name, expected):

    group = GroupFactory(name=name)

    assert group.slug == expected


@pytest.mark.django_db
def test_default_group_category_is_sports_group(group):
    """ A default group should have the category of Sports Group """

    assert group.category == GroupCategory.sports_group


@pytest.mark.django_db
def test_that_group_category_may_be_set_to_administrative_group():
    """ A group should be able to be set as an administrative group """

    group = GroupFactory(category=GroupCategory.administrative_group)

    assert group.category == GroupCategory.administrative_group


@pytest.mark.django_db
def test_that_group_category_can_be_changed(group):
    """
    A group should be able to have their category updated to
    for example an administrative group from the default sports_group
    """

    default_category = group.category
    group.category = GroupCategory.administrative_group

    assert group.category != default_category
    assert group.category == GroupCategory.administrative_group


@pytest.mark.django_db
def test_that_group_category_cannot_be_changed_to_nonsense(group):
    """
    A group category should be a defined enum and should not be set as some nonsense
    category.
    """

    group.category = "nonsense_group"

    with pytest.raises(ValueError):
        group.save()


@pytest.mark.django_db
def test_group_contains_for_actual_member(group):

    membership = MembershipFactory(group=group)

    assert membership.member in group


@pytest.mark.django_db
def test_group_contains_non_member(group):

    another_group = GroupFactory()

    membership = MembershipFactory(group=another_group)

    assert membership.member not in group


@pytest.mark.django_db
def test_group_get_membership_for_actual_member(group):

    membership = MembershipFactory(group=group)

    assert group.get_membership(user=membership.member) == membership


@pytest.mark.django_db
@pytest.mark.parametrize(("access", "expected"), [("O", "Open"), ("C", "Closed"), ("H", "Hidden")])
def test_group_get_access_status(access, expected):

    group = GroupFactory.build(access=access)

    assert group.get_access_status() == expected


@pytest.mark.django_db
def test_group_get_membership_for_non_member(group):

    another_group = GroupFactory()

    membership = MembershipFactory(group=another_group)

    assert not group.get_membership(user=membership.member)
