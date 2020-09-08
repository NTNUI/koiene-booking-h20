import logging
import uuid

from django.db import models
from rest_framework.exceptions import ValidationError

from payments.models.stripe_transaction import StripeTransaction

from django.utils.translation import gettext as _

logger = logging.getLogger(__name__)


class AbstractPayment(models.Model):

    id = models.UUIDField(
        auto_created=True, primary_key=True, default=uuid.uuid4, serialize=False, verbose_name="ID"
    )

    transaction = models.OneToOneField(
        StripeTransaction,
        on_delete=models.CASCADE,
        blank=True,
        null=False,
        related_name="%(app_label)s_%(class)s_related",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def get_related_name(self):
        """
        Return the related name of this model.
        It should be used to reference it from the StripeTransaction.
        """
        return f"{self._meta.app_label}_{self._meta.model_name}_related"

    def clean(self):

        if not self.get_payment_key():
            raise ValidationError(_(f"{self.get_seller()} does not have a payment key"))

        if not self.get_price_in_nok():
            raise ValidationError(_("The payment needs to specify a price"))

        if self.get_price_in_nok() <= 0:
            raise ValidationError(_("The price has to be positive"))

    def save(self, *args, **kwargs):

        self.clean()

        if not self.created_at:
            # On creation of a payment a StripeTransaction should be connected to self.
            # The payment is completed when the status of transaction is set to 'succeeded'

            self.transaction = StripeTransaction(payment_related_name=self.get_related_name())
            self.transaction.save()
            logger.info(f"Payment created: {self.__str__()}")

        super().save()

    def is_paid(self):
        """ Returns True if the StripeTransaction is completed """
        return self.transaction.is_paid()

    is_paid.boolean = True

    def get_price_in_nok(self):
        """ Return the price of the payment """
        raise NotImplementedError("Extended class must implement this method")

    def get_buyer(self):
        """ Return the buyer of the payment """
        raise NotImplementedError("Extended class must implement this method")

    def get_seller(self):
        """ Return the seller of the payment """
        raise NotImplementedError("Extended class must implement this method")

    def get_payment_key(self):
        """ Returns the payment key of the seller """
        return self.get_seller().get_payment_key()
