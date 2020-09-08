from unittest.mock import MagicMock, Mock

import pytest

from accounts.factories.user_factory import UserFactory
from groups.factories.group_factory import GroupFactory
from groups.factories.membership_factory import MembershipFactory
from groups.permissions import IsAdminUser, IsBoardMember, IsGroupLeader, IsGroupMember
from ntnui.enums import MembershipType

from django.contrib.auth.models import AnonymousUser


@pytest.fixture()
def group():
    return GroupFactory()


@pytest.fixture()
def user():
    return UserFactory()


@pytest.fixture()
def request_mock(user):
    return Mock(user=user)


@pytest.fixture()
def view():
    return MagicMock()


@pytest.mark.django_db()
@pytest.mark.parametrize(
    "membership_type",
    [
        MembershipType.leader,
        MembershipType.deputy_leader,
        MembershipType.cashier,
        MembershipType.board_member,
        MembershipType.deputy_board_member,
        MembershipType.member,
    ],
)
def test_admin_user_permission(user, group, request_mock, view, membership_type):
    """ Verifies that no users should have admin permissions based on their type. """
    permission = IsAdminUser()
    MembershipFactory(member=user, type=membership_type)

    assert not permission.has_object_permission(request_mock, view, group)


@pytest.mark.django_db()
@pytest.mark.parametrize(
    ("membership_type", "expected"),
    [
        (MembershipType.leader, True),
        (MembershipType.deputy_leader, False),
        (MembershipType.cashier, False),
        (MembershipType.board_member, False),
        (MembershipType.deputy_board_member, False),
        (MembershipType.member, False),
    ],
)
def test_group_leader_permission(user, group, request_mock, view, membership_type, expected):
    """ Verifies that only leaders have the leader permission in their group """
    permission = IsGroupLeader()
    MembershipFactory(member=user, group=group, type=membership_type)

    assert permission.has_object_permission(request_mock, view, group) == expected


@pytest.mark.django_db()
@pytest.mark.parametrize(
    ("membership_type", "expected"),
    [
        (MembershipType.leader, True),
        (MembershipType.deputy_leader, True),
        (MembershipType.cashier, True),
        (MembershipType.board_member, True),
        (MembershipType.deputy_board_member, True),
        (MembershipType.member, False),
    ],
)
def test_board_member_permission(user, group, request_mock, view, membership_type, expected):
    """ Verifies that all board members have the board member permission in their group """
    permission = IsBoardMember()
    MembershipFactory(member=user, group=group, type=membership_type)

    assert permission.has_object_permission(request_mock, view, group) == expected


@pytest.mark.django_db()
@pytest.mark.parametrize(
    "membership_type",
    [
        MembershipType.leader,
        MembershipType.deputy_leader,
        MembershipType.cashier,
        MembershipType.board_member,
        MembershipType.deputy_board_member,
        MembershipType.member,
    ],
)
def test_group_member_permission(user, group, request_mock, view, membership_type):
    """ Verifies that all group members have the group member permission in their group """

    permission = IsGroupMember()
    MembershipFactory(member=user, group=group, type=membership_type)

    assert permission.has_object_permission(request_mock, view, group)


@pytest.mark.django_db()
@pytest.mark.parametrize(
    "permission", [IsAdminUser(), IsGroupLeader(), IsBoardMember(), IsGroupMember()]
)
def test_anonymous_user_has_no_permissions(group, view, permission):
    """ Verifies that anonymous user have no permissions """
    request = Mock(user=AnonymousUser())

    assert not permission.has_object_permission(request, view, group)


@pytest.mark.django_db()
@pytest.mark.parametrize(
    ("membership_type", "permission"),
    [
        (MembershipType.leader, IsGroupLeader()),
        (MembershipType.board_member, IsBoardMember()),
        (MembershipType.member, IsGroupMember()),
    ],
)
def test_no_permissions_in_other_groups(
    user, group, view, request_mock, membership_type, permission
):
    """ Verifies that a permission is only granted inside the given group """
    MembershipFactory(member=user, group=group, type=membership_type)
    other_group = GroupFactory()

    assert group != other_group
    assert not permission.has_object_permission(request_mock, view, other_group)
