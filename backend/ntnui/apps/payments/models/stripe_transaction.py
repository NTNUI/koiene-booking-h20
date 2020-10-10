import logging
import uuid

import stripe
from django.db import models
from rest_framework.exceptions import ValidationError
from stripe.error import StripeError

logger = logging.getLogger(__name__)


class StripeTransaction(models.Model):

    id = models.UUIDField(
        auto_created=True, primary_key=True, default=uuid.uuid4, serialize=False, verbose_name="ID"
    )

    charge_id = models.CharField(max_length=40, editable=True, blank=True)
    token_id = models.CharField(max_length=40, editable=True, blank=True)
    stripe_status = models.CharField(max_length=40, editable=True, blank=True, default="created")
    payment_related_name = models.CharField(max_length=80, blank=False, null=False)

    class Meta:
        verbose_name = "Stripe Transaction"
        verbose_name_plural = "Stripe Transactions"

    def __str__(self):
        return f"{str(self.id)}"

    def get_status(self):
        return self.stripe_status

    def get_payment(self):
        """
        Returns the payment related to self, by using the related name defined in AbstractPayment
        """
        return getattr(self, self.payment_related_name)

    def is_paid(self):
        """
        Checks if a succeeded charge has been recorded, signifying a completed payment.
        If such a status has not been recorded the function initiates a request to Stripe,
        and checks if the result is succeeded.
        """

        if self.stripe_status == "succeeded":
            return True
        elif not self.token_id:
            # Without a token_id there cannot exist a Stripe charge,
            # and thus the payment cannot be paid
            return False
        else:
            # Ensure that Stripe-related errors won´t crash the program prematurely
            try:
                self.update_and_save_status_from_stripe()
                return self.stripe_status == "succeeded"
            except (StripeError, ValidationError):
                return None

    is_paid.boolean = True

    def update_and_save_status_from_stripe(self):
        """ Gets a charge from Stripe, and saves the status  """

        charge = self.try_to_retrieve_charge_from_stripe()
        self.stripe_status = charge["status"]
        self.save()

    def try_to_retrieve_charge_from_stripe(self):
        """ Error-handling for retrieve_status_from_stripe """

        if not self.token_id:
            raise ValidationError("A valid token has not been added")
        if not self.charge_id:
            raise ValidationError("A valid charge_id has not been added")

        payment_key = self.get_payment_key()

        return self.retrieve_charge_from_stripe(payment_key)

    def retrieve_charge_from_stripe(self, payment_key):
        """ Retrieves the status of a charge from Stripe """

        charge = stripe.Charge.retrieve(api_key=payment_key, id=self.charge_id)
        logger.info(f"Retrieved charge from Stripe: {charge}")
        return charge

    def try_to_create_charge_on_stripe(self, token_id):
        """ Error-handling for create_charge_on_stripe """
        if not token_id:
            raise ValidationError("A token must be included to create a Stripe charge")
        if self.token_id:
            raise ValidationError("A token from Stripe is already connected to this object")
        if self.charge_id:
            raise ValidationError("A charge from Stripe is already connected to this object")
        self.get_payment().validate()  # Validating payment-object specific problems
        payment_key = self.get_payment_key()
        amount = self.get_price_in_ore()
        description = str(self.get_payment())

        self.create_charge_on_stripe(payment_key, token_id, amount, description)

    def create_charge_on_stripe(self, payment_key, token_id, amount, description):
        """
        Sends a request to Stripe to create a charge. If successful both token_id and charge_id
        will be saved.
        """
        charge = stripe.Charge.create(
            api_key=payment_key,
            amount=amount,
            currency="nok",
            description=description,
            source=token_id,
        )

        logger.info(f"Created charge on Stripe: {charge}")

        self.token_id = token_id
        self.charge_id = charge["id"]
        self.save()
        self.send_paid_status()

    def send_paid_status(self):
        try:
            self.get_payment().send_paid_status()
        except AttributeError:
            pass

    def get_buyer(self):
        return self.get_payment().get_buyer()

    def get_seller(self):
        return self.get_payment().get_seller()

    def get_payment_key(self):
        return self.get_payment().get_payment_key()

    def get_price_in_ore(self):
        """ Stripe handles all amounts in øre, and not kroner """
        return self.get_payment().get_price_in_nok() * 100
