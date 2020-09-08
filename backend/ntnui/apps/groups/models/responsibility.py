from django.db import models
from enumchoicefield import ChoiceEnum, EnumChoiceField

from groups.models import MembershipModel


class ResponsibilityType(ChoiceEnum):
    it = "IT"
    web = "Web"
    events = "Events"
    communications = "Communications"
    trainer = "Trainer"


class ResponsibilityModel(models.Model):
    id = models.AutoField(primary_key=True)
    type = EnumChoiceField(ResponsibilityType)
    membership = models.ForeignKey(MembershipModel, on_delete=models.CASCADE)

    class Meta:
        """ Configure the name displayed in the admin panel """

        verbose_name = "Responsibility"
        verbose_name_plural = "Responsibilities"

    def __str__(self):
        return f"{self.membership.member} - {self.type} for {self.membership.group}"
