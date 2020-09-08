from django.test import TestCase
from rest_framework.exceptions import ValidationError

from accounts.models.user import UserModel
from groups.models import GroupModel
from groups.models.membership import MembershipModel
from ntnui.enums import MembershipType


class TestMembershipModel(TestCase):
    def setUp(self):
        """ Setup required models """
        self.test_leader = UserModel.objects.create(
            first_name="Test",
            last_name="Leader",
            email="Test.leader@ntnui.no",
            contact_email="Test.leader@ntnui.no",
            phone_number="+4700000000",
        )
        self.test_cashier = UserModel.objects.create(
            first_name="Test",
            last_name="Cashier",
            email="Test.cashier@ntnui.no",
            contact_email="Test.cashier@ntnui.no",
            phone_number="+4700000000",
        )
        self.test_deputy = UserModel.objects.create(
            first_name="Test",
            last_name="Deputy",
            email="Test.deputy@ntnui.no",
            phone_number="+4700000000",
        )
        self.test_volunteer = UserModel.objects.create(
            first_name="Test",
            last_name="Volunteer",
            email="test.volunteer@ntnui.no",
            phone_number="+4700000000",
        )
        self.member_user = UserModel.objects.create(
            first_name="Ådne",
            last_name="Tester",
            email="test@ntnui.no",
            phone_number="+4700000000",
        )

        self.test_group = GroupModel.objects.create(name="Test")

        self.leader_membership = MembershipModel.objects.create(
            member=self.test_leader, group=self.test_group, type=MembershipType.leader
        )
        self.deputy_membership = MembershipModel.objects.create(
            member=self.test_deputy, group=self.test_group, type=MembershipType.deputy_leader,
        )
        self.cashier_membership = MembershipModel.objects.create(
            member=self.test_cashier, group=self.test_group, type=MembershipType.cashier
        )

        self.member_membership = MembershipModel.objects.create(
            member=self.member_user, group=self.test_group, type=MembershipType.member
        )
        self.volunteer_membership = MembershipModel.objects.create(
            member=self.test_volunteer, group=self.test_group, type=MembershipType.volunteer,
        )

    def test_membership_is_deleted(self):
        """ Tests that a membership can be properly deleted """

        self.assertTrue(self.member_user in self.test_group)

        self.member_membership.delete()

        self.assertFalse(self.member_user in self.test_group)

    def test_user_is_member_of_group(self):
        """ Tests that the user has a membership to the group"""

        memberships = MembershipModel.objects.filter(member=self.member_user, group=self.test_group)
        self.assertEqual(memberships.count(), 1)
        self.assertEqual(memberships[0].member, self.member_user)

    def test_membership_str(self):
        """ Tests that the user is correctly represented as a string"""

        membership = MembershipModel.objects.get(member=self.test_leader)
        self.assertEqual(str(membership), "Membership for Test Leader to Test")
