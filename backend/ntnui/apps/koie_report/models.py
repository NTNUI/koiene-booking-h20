from django.db import models
from koie_booking.models.booking import BookingModel
# Create your models here.


class KoieReportModel(models.Model):
    OK = 0
    NOT_SURE = 1
    BROKEN_OR_MISSING = 2
    EQUIPMENT_STATUS = [
        (OK, 'Ok'),
        (NOT_SURE, 'Not sure'),
        (BROKEN_OR_MISSING, 'Broken/missing')
    ]

    EMPTY = 0
    ALMOST_EMPTY = 1
    HALFWAY = 2
    ALMOST_FULL = 3
    FULL = 4
    WOOD_SUPPLY = [
        (EMPTY, 'Empty'),
        (ALMOST_EMPTY, 'Almost empty'),
        (HALFWAY, 'Half empty/full'),
        (ALMOST_FULL, 'Almost full'),
        (FULL, 'Full')
    ]

    booking = models.ForeignKey(BookingModel, on_delete=models.CASCADE)
    date_created_at = models.DateField(auto_now=True)
    feedback = models.TextField(blank=True)

    wood = models.IntegerField(choices=WOOD_SUPPLY)
    smoke_detector_is_working = models.BooleanField(default=True)
    gas_is_full = models.BooleanField(default=True)

    # Equipment status

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

    class Meta:
        """ Configure the name displayed in the admin panel """

        verbose_name = "Koie Report"
        verbose_name_plural = "Koie Reports"
