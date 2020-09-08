import pytest

from ntnui.enums import MembershipType, SubmembershipType


@pytest.mark.parametrize(
    "membership_type", [MembershipType.leader, MembershipType.deputy_leader, MembershipType.cashier]
)
def test_singular_board_members_includes_correct_types(membership_type):

    assert membership_type in MembershipType.singular_board_members()


@pytest.mark.parametrize(
    "membership_type",
    [
        MembershipType.board_member,
        MembershipType.deputy_board_member,
        MembershipType.volunteer,
        MembershipType.member,
    ],
)
def test_singular_board_members_excludes_wrong_types(membership_type):

    assert membership_type not in MembershipType.singular_board_members()


@pytest.mark.parametrize(
    "membership_type",
    [
        MembershipType.leader,
        MembershipType.deputy_leader,
        MembershipType.cashier,
        MembershipType.board_member,
        MembershipType.deputy_board_member,
    ],
)
def test_board_members_includes_correct_types(membership_type):

    assert membership_type in MembershipType.board_members()


@pytest.mark.parametrize("submembership_type", [SubmembershipType.leader, SubmembershipType.admin])
def test_subgroup_board_members(submembership_type):

    assert submembership_type in SubmembershipType.subgroup_board_members()


@pytest.mark.parametrize("membership_type", [MembershipType.volunteer, MembershipType.member])
def test_board_members_excludes_wrong_types(membership_type):

    assert membership_type not in MembershipType.singular_board_members()


@pytest.mark.parametrize(
    ("membership_type", "expected"),
    [
        (MembershipType.leader, "leder"),
        (MembershipType.deputy_leader, "nestleder"),
        (MembershipType.cashier, "kasserer"),
        (MembershipType.board_member, "styremedlem"),
        (MembershipType.deputy_board_member, "varastyremedlem"),
        (MembershipType.volunteer, "frivillig"),
        (MembershipType.member, "medlem"),
    ],
)
def test_membership_type_translation(membership_type, expected):

    assert membership_type.to_norwegian() == expected
