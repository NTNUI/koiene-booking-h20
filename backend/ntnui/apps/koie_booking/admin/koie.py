from koie_booking.models.koie import KoieModel
from ntnui.admin import NtnuiAdmin

from django.contrib import admin


@admin.register(KoieModel)
class KoieModelAdmin(NtnuiAdmin):
    search_fields = ["name", "number_of_beds"]
    list_display = ["name"]
