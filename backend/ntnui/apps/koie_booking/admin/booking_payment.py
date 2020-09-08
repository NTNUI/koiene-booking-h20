from koie_booking.models.booking_payment import BookingPayment
from ntnui.admin import NtnuiAdmin

from django.contrib import admin


@admin.register(BookingPayment)
class BookingPaymentAdmin(NtnuiAdmin):
    search_fields = ["pk"]
    exclude = ("meta",)
