from rest_framework import serializers

from koie_report.models import KoieReportModel


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = KoieReportModel
        fields = [
            "id",
            "booking",
            "date_created_at",
            "feedback",
            "firewood",
            "smoke_detector_is_working",
            "gas_is_full",
            "gas_burner_primus",
            "axe",
            "hammer",
            "saw",
            "saw_blade",
            "saw_bench",
            "spade",
            "kerosene_lamp",
            "detergent",
            "dishware",
            "cookware",
            "cabin_book",
            "candle_holders",
            "fire_blanket",
            "fire_extinguisher",
            "boat_status",
            "canoe_status",
            "life_jackets_status",
            "other_faults",
            "chopped_up_wood",
        ]

        read_only_fields = ["booking", "id", "date_created_at"]


class FilteredReportSerializer(serializers.ModelSerializer):
    koie_name = serializers.CharField(source="booking.koie.name", read_only=True)
    date_of_stay = serializers.DateField(source="booking.arrival_date", read_only=True)
    equipment_status = serializers.SerializerMethodField()

    class Meta:
        model = KoieReportModel
        fields = [
            "id",
            "date_created_at",
            "koie_name",
            "date_of_stay",
            "gas_is_full",
            "firewood",
            "chopped_up_wood",
            "boat_status",
            "canoe_status",
            "life_jackets_status",
            "smoke_detector_is_working",
            "equipment_status",
            "other_faults",
            "feedback",
        ]

    def get_equipment_status(self, obj):
        return obj.get_sorted_equipment_status()
