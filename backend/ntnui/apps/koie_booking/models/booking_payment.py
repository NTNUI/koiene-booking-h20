import logging

from django.core.exceptions import ValidationError
from django.db import models

from groups.models.group import GroupModel
from payments.models.abstract_payment import AbstractPayment

from django.utils import timezone
from django.utils.translation import gettext as _

logger = logging.getLogger(__name__)


class BookingPayment(AbstractPayment):

    price = models.PositiveIntegerField()

    class Meta:
        verbose_name = "Booking Payment"
        verbose_name_plural = "Booking Payments"

    def __str__(self):
        if self.get_booking():
            return _(
                f"Payment for booking {self.booking.uuid} from {self.get_buyer()} "
                f"to {self.get_seller()}"
            )
        return "Booking for this payment is not yet created"

    def get_booking(self):
        return getattr(self, "booking", None)

    def send_paid_status(self):
        self.get_booking().set_payment_status()

    def get_price_in_nok(self):
        return self.price

    def get_buyer(self):
        return self.get_booking().user

    def get_seller(self):
        return GroupModel.objects.get(slug="koiene")

    def validate(self):
        reservation_window = timezone.timedelta(minutes=16)
        if self.get_booking().created + reservation_window < timezone.now():
            raise ValidationError(_("The booking reservation has expired"))
