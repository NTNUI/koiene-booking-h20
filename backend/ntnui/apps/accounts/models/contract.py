from django.db import models
from enumchoicefield import EnumChoiceField

from accounts.models import UserModel
from ntnui.enums import ContractType


class Contract(models.Model):
    """
    A membership contract. Valid durations are 6 and 12 months, and the periods can be spring, fall
    and school year.
    """

    expiry_date = models.DateField(null=True)
    type = EnumChoiceField(ContractType, default=ContractType.student_membership)
    user = models.ForeignKey(UserModel, related_name="contracts", on_delete=models.CASCADE)

    class Meta:
        """ Configure the name displayed in the admin panel """

        verbose_name = "Contract"
        verbose_name_plural = "Contracts"

    def __str__(self):
        return f"{self.user} - {self.type} to {self.expiry_date}"
