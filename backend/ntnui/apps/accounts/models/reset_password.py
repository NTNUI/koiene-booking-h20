import uuid
from datetime import timedelta

from django.core.exceptions import ValidationError
from django.db import models

from accounts.models import UserModel
from ntnui.utils.send_email import send_email

from django.utils import timezone
from django.utils.translation import gettext as _


class ResetPassword(models.Model):
    """ Model containing token used to reset user password """

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    expiration_date = models.DateTimeField(null=False)
    user = models.ForeignKey(UserModel, on_delete=models.PROTECT, null=False)

    def save(self, *args, **kwargs):
        """ Deletes old token, and sends a reset password email to the user"""

        # Delete old tokens
        ResetPassword.objects.filter(user=self.user).delete()
        # Save the instance
        self.expiration_date = timezone.now() + timedelta(days=1)
        super().save(*args, **kwargs)
        send_email(
            data={"user": self.user, "token": self.uuid},
            subject=_("NTNUI - Reset password"),
            to=[self.user.email],
            path="emails/reset_password.html",
        )

    @classmethod
    def validate_token(cls, token):
        """ Ensure that the token exists and that it is valid"""

        try:
            reset_password = cls.objects.get(uuid=token)
            return reset_password.expiration_date > timezone.now()
        except (cls.DoesNotExist, ValidationError):
            return False
