import logging
from datetime import date, timedelta

from django.db import models
from enumchoicefield import EnumChoiceField

from accounts.models import UserModel
from groups.models import GroupModel
from ntnui.enums import MembershipType

logger = logging.getLogger(__name__)


def one_year_from_today():
    return date.today() + timedelta(days=365)


class MembershipModel(models.Model):
    """ Membership details """

    # Auto-generated membership number as primary key
    membership_no = models.AutoField(primary_key=True)

    # Default to object creation time, but allow this to be set manually
    date_joined = models.DateField(default=date.today)

    # Whether or not the membership fee has been payed (if applicable)
    group_expiry = models.DateField(default=one_year_from_today)

    type = EnumChoiceField(MembershipType, default=MembershipType.member)

    """ Membership relationships """
    member = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE)

    class Meta:
        """ Configure the name displayed in the admin panel """

        verbose_name = "Membership"
        verbose_name_plural = "Memberships"

        unique_together = ("member", "group")

    def __str__(self):
        return "Membership for {} to {}".format(str(self.member), str(self.group))

    def is_singular_board_member(self):
        return self.type in MembershipType.singular_board_members()

    def is_board_member(self):
        return self.type in MembershipType.board_members()
