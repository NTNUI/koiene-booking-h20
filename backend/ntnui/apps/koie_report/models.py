from django.db import models

from koie_booking.models.booking import BookingModel


class KoieReportModel(models.Model):
    OK = 0
    NOT_SURE = 1
    BROKEN_OR_MISSING = 2
    EQUIPMENT_STATUS = [(OK, "Ok"), (NOT_SURE, "Not sure"), (BROKEN_OR_MISSING, "Broken/missing")]

    EMPTY = 0
    ALMOST_EMPTY = 1
    HALFWAY = 2
    ALMOST_FULL = 3
    FULL = 4
    WOOD_SUPPLY = [
        (EMPTY, "Empty"),
        (ALMOST_EMPTY, "Almost empty"),
        (HALFWAY, "Half empty/full"),
        (ALMOST_FULL, "Almost full"),
        (FULL, "Full"),
    ]

    booking = models.ForeignKey(BookingModel, on_delete=models.CASCADE)
    date_created_at = models.DateField(auto_now=True)
    feedback = models.TextField(blank=True, null=True)

    firewood = models.IntegerField(choices=WOOD_SUPPLY)
    chopped_up_wood = models.IntegerField(choices=WOOD_SUPPLY)
    smoke_detector_is_working = models.BooleanField(default=True)
    gas_is_full = models.BooleanField(default=True)

    gas_burner_primus = models.IntegerField(choices=EQUIPMENT_STATUS)
    axe = models.IntegerField(choices=EQUIPMENT_STATUS)
    hammer = models.IntegerField(choices=EQUIPMENT_STATUS)
    saw = models.IntegerField(choices=EQUIPMENT_STATUS)
    saw_blade = models.IntegerField(choices=EQUIPMENT_STATUS)
    saw_bench = models.IntegerField(choices=EQUIPMENT_STATUS)
    spade = models.IntegerField(choices=EQUIPMENT_STATUS)
    kerosene_lamp = models.IntegerField(choices=EQUIPMENT_STATUS)
    detergent = models.IntegerField(choices=EQUIPMENT_STATUS)
    dishware = models.IntegerField(choices=EQUIPMENT_STATUS)
    cookware = models.IntegerField(choices=EQUIPMENT_STATUS)
    cabin_book = models.IntegerField(choices=EQUIPMENT_STATUS)
    candle_holders = models.IntegerField(choices=EQUIPMENT_STATUS)
    fire_blanket = models.IntegerField(choices=EQUIPMENT_STATUS)
    fire_extinguisher = models.IntegerField(choices=EQUIPMENT_STATUS)
    other_faults = models.TextField(null=True, blank=True)

    NO_FAULTS = 0
    BROKEN = 1
    MISSING_PADDLES = 2
    MISSING_BOAT_OR_CANOE = 3
    NOT_USED = 4
    BOAT_CANOE_STATUS = [
        (NO_FAULTS, "No faults"),
        (BROKEN, "Broken / can not use"),
        (MISSING_PADDLES, "Missing paddles"),
        (MISSING_BOAT_OR_CANOE, "Missing boat"),
        (NOT_USED, "Did not use/do not know"),
    ]
    boat_status = models.IntegerField(choices=BOAT_CANOE_STATUS)
    canoe_status = models.IntegerField(choices=BOAT_CANOE_STATUS)
    NO_FAULTS_LIFE_JACKET = 0
    BROKEN_LIFE_JACKET = 1
    MISSING_LIFE_JACKET = 2
    NOT_USED_LIFE_JACKET = 3

    LIFE_JACKET_STATUS = [
        (NO_FAULTS_LIFE_JACKET, "No faults"),
        (BROKEN_LIFE_JACKET, "Broken / can not use"),
        (MISSING_LIFE_JACKET, "Missing life jackets or too few"),
        (NOT_USED_LIFE_JACKET, "Did not use/ do not know"),
    ]
    life_jackets_status = models.IntegerField(choices=LIFE_JACKET_STATUS)

    class Meta:
        """ Configure the name displayed in the admin panel """

        verbose_name = "Koie Report"
        verbose_name_plural = "Koie Reports"
