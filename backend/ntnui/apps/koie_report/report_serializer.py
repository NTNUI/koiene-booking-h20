from koie_report.models import KoieReportModel
from rest_framework import serializers


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = KoieReportModel
        fields = ["date_created_at", "feedback", "firewood",
                  "smoke_detector_is_working", "gas_is_full",
                  "gas_burner_primus",
                  "axe", "hammer", "saw", "saw_blade", "saw_bench", "spade",
                  "kerosene_lamp", "detergent", "dishware", "cookware",
                  "cabin_book", "candle_holders", "fire_blanket",
                  "fire_extinguisher", "boat_status", "canoe_status",
                  "life_jackets_status", "other_faults",
                  "chopped_up_wood"]
