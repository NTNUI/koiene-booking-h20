import uuid

from django.db import models
from enumchoicefield import EnumChoiceField

from accounts.models.user import UserModel
from koie_booking.models.booking_payment import BookingPayment
from koie_booking.models.koie import KoieModel
from koie_booking.utils import mail_utils
from ntnui.enums import KeyStatus


class BookingModel(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    koie = models.ForeignKey(KoieModel, null=True, on_delete=models.CASCADE)
    contact_email = models.CharField(max_length=40, default="")
    uuid = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)
    arrival_date = models.DateField()
    departure_date = models.DateField()
    guests_member = models.PositiveIntegerField(null=False, default=1)
    guests_not_member = models.PositiveIntegerField(null=False, default=1)
    key_status = EnumChoiceField(KeyStatus, default=KeyStatus.not_picked_up)
    paid = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now=True, null=True)

    booking_payment = models.OneToOneField(
        BookingPayment, on_delete=models.CASCADE, blank=True, null=True, related_name="booking",
    )

    class Meta:
        """ Configure the name displayed in the admin panel """

        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def __str__(self):
        guests = self.guests_member + self.guests_not_member
        return f"Reservation for {self.koie.name} at {self.arrival_date} for {guests} guests"

    def get_number_of_nights(self):
        return (self.departure_date - self.arrival_date).days

    def get_total_price(self):
        price_per_night = (
            self.guests_member * self.koie.price_member
            + self.guests_not_member * self.koie.price_not_member
        )

        return price_per_night * self.get_number_of_nights()

    def get_booking_payment(self):
        return self.booking_payment

    def get_transaction_id(self):
        return self.booking_payment.transaction.pk

    def get_contact_email(self):
        return self.contact_email

    def set_payment_status(self):
        if self.booking_payment.is_paid() and (not self.paid):
            self.paid = True
            mail_utils.send_confirmation_mail(self)
            mail_utils.send_koie_information_mail(self)
            self.save()

    def create_payment(self):
        self.booking_payment = BookingPayment(price=self.get_total_price())
        self.booking_payment.save()

    def save(self, *args, **kwargs):
        super(BookingModel, self).save()
        if self.get_total_price() and not self.booking_payment:
            self.create_payment()
