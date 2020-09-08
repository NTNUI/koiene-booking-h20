import factory.django

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from groups.models import MembershipModel
from ntnui.enums import MembershipType


class MembershipFactory(factory.DjangoModelFactory):
    """
    Simplifies construction of a non-board membership object and includes
    UserFactory and GroupFactory
    """

    class Meta:
        model = MembershipModel

    member = factory.SubFactory(UserFactory)
    group = factory.SubFactory(GroupFactory)

    type = MembershipType.member


class BoardMembershipFactory(MembershipFactory):
    """
    Simplifies construction of a board membership object and includes
    UserFactory and GroupFactory
    """

    type = factory.Iterator(MembershipType.board_members())
