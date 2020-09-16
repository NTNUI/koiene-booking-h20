from koie_report.models import KoieReportModel
from ntnui.admin import NtnuiAdmin

from django.contrib import admin


@admin.register(KoieReportModel)
class KoieReportAdmin(NtnuiAdmin):
    search_fields = ["booking","date_created_at", "comment","wood", "smoke_detector", "gas"]
 