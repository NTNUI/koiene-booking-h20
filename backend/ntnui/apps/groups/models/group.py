from datetime import date

from django.db import models
from enumchoicefield import EnumChoiceField
from slugify import slugify

from accounts.models import UserModel
from ntnui.enums import ACCESS_CHOICES, GroupCategory


class GroupModel(models.Model):
    """ Group information """

    group_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    founding_date = models.DateField(default=date.today, null=False, blank=False, editable=True)

    slug = models.SlugField(editable=False)

    access = models.CharField(max_length=20, choices=ACCESS_CHOICES, default="O")
    category = EnumChoiceField(GroupCategory, default=GroupCategory.sports_group)

    payment_key = models.CharField(max_length=40, null=True, blank=True)

    members = models.ManyToManyField(UserModel, through="MembershipModel")

    class Meta:
        """ Configure the name displayed in the admin panel """

        verbose_name = "Group"
        verbose_name_plural = "Groups"

    def __str__(self):
        return self.name.title()

    def __contains__(self, user):
        """ Checks if a user is a member of this group """

        from groups.models import MembershipModel

        return MembershipModel.objects.filter(member=user, group=self).exists()

    def save(self, *args, **kwargs):
        """
        Use Slugify to generate a slug with support for Norwegian characters.
        """

        self.slug = slugify(self.name, to_lower=True)
        super(GroupModel, self).save(*args, **kwargs)

    def get_access_status(self):
        """ Returns the access status of the group (open, closed, hidden) """

        return dict(ACCESS_CHOICES)[self.access]

    def get_membership(self, user):
        """ Gets a user's membership to this group if it exists """
        from groups.models import MembershipModel

        if user in self:
            return MembershipModel.objects.get(member=user, group=self)

        return None

    def get_payment_key(self):
        return self.payment_key
