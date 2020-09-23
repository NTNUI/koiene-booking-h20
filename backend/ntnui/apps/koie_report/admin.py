from koie_report.models import KoieReportModel
from ntnui.admin import NtnuiAdmin

from django.contrib import admin


@admin.register(KoieReportModel)
class KoieReportAdmin(NtnuiAdmin):
    search_fields = ["booking", "date_created_at", "feedback", "wood",
                     "smoke_detector_is_working", "gas_is_full",
                     "gas_burner_primus",
                     "axe", "hammer", "saw", "saw_blade", "saw_bench", "spade",
                     "kerosene_lamp", "detergent", "dishware", "cookware",
                     "cabin_book", "candle_holders", "fire_blanket",
                     "fire_extinguisher", "boat_status", "canoe_status",
                     "life_jackets_status", "other_faults"
                     "chopped_up_wood"]
