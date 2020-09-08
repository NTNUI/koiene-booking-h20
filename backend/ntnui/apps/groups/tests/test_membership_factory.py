import factory.random
import pytest

from groups.factories.membership_factory import BoardMembershipFactory, MembershipFactory
from ntnui.enums import MembershipType

factory.random.reseed_random("arbitrary_seed")


@pytest.mark.django_db
def test_membership_factory():
    """Test that a membership object exist """

    membership = MembershipFactory()

    assert membership.type == MembershipType.member
    assert membership.group.name in ["Aikido", "American Football", "Volleyball"]


@pytest.mark.django_db
def test_board_membership_factory():
    """
    Test that board membership type change when you make
    multiple board memberships
    """

    assert BoardMembershipFactory.build().type == MembershipType.leader
    assert BoardMembershipFactory.build().type == MembershipType.deputy_leader
    assert BoardMembershipFactory.build().type == MembershipType.cashier
    assert BoardMembershipFactory.build().type == MembershipType.board_member
    assert BoardMembershipFactory.build().type == MembershipType.deputy_board_member
