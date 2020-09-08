from koie_booking.models.booking import BookingModel
from ntnui.admin import NtnuiAdmin

from django.contrib import admin


@admin.register(BookingModel)
class BookingAdmin(NtnuiAdmin):
    search_fields = ["user", "koie"]
    exclude = ("meta",)
