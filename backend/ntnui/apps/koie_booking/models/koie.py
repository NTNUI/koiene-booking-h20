from django.db import models
from django.template.defaultfilters import slugify
from enumchoicefield import EnumChoiceField

from koie_booking.models.description import Description
from koie_booking.models.location import Location
from koie_booking.utils import date_utils
from ntnui.enums import DifficultyType, KoieType

from django.utils.timezone import now, timedelta


class KoieModel(models.Model):
    name = models.CharField(max_length=40, null=True)
    slug = models.SlugField(default=name, editable=False)

    price_member = models.IntegerField(default=40)
    price_not_member = models.IntegerField(default=80)
    number_of_beds = models.IntegerField(default=1)

    koie_type = EnumChoiceField(KoieType, default=KoieType.koie)
    difficulty = EnumChoiceField(DifficultyType, default=DifficultyType.two)

    album = models.TextField(null=True)

    booking_window = models.IntegerField(default=14)

    description = models.ForeignKey(Description, on_delete=models.CASCADE, default="")
    location = models.ForeignKey(Location, on_delete=models.CASCADE, default="")

    class Meta:
        verbose_name = "Koie"
        verbose_name_plural = "Koier"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(KoieModel, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"

    def get_beds_available_in_booking_window(self):
        """
        This function returns a dictionary containing the possible booking-dates
        with associated available number of beds.
        """
        return self.get_beds_available_in_date_range(now().date(), (now().date() + timedelta(days=self.booking_window)))

    def get_beds_available_in_date_range(self, from_date, to_date):
        """
        This function returns a dictionary containing the possible booking-dates
        with associated available number of beds within the given daterange.
        Dates must be provided as datetime.date object.
        Function uses help-functions below,
        that goes through every date to find the beds occupied in a koie on each date.
        """
        date_availability = {}
        for day in date_utils.get_daterange(
            from_date, to_date
        ):
            date_availability[
                day.strftime("%Y-%m-%d")
            ] = self.number_of_beds - self.get_beds_available_for_day(day)
        return date_availability

    def get_beds_available_for_day(self, day):
        """
        Sums beds occupied for reserved and paid bookings.
        """
        return self.get_number_of_reserved_beds(day) + self.get_number_of_sold_beds(day)

    def get_number_of_reserved_beds(self, day):
        """
        Get number of beds reserved for koie on date
        """
        from koie_booking.models.booking import BookingModel

        reserved_bookings = BookingModel.objects.filter(
            koie=self,
            paid=False,
            created__gt=(now() - timedelta(minutes=16)),
            arrival_date__lte=day,
            departure_date__gt=day,
        )
        guests_member = reserved_bookings.aggregate(models.Sum("guests_member"))[
            "guests_member__sum"
        ]
        guests_not_member = reserved_bookings.aggregate(models.Sum("guests_not_member"))[
            "guests_not_member__sum"
        ]
        member_sum = guests_member if guests_member else 0
        not_member_sum = guests_not_member if guests_not_member else 0
        return member_sum + not_member_sum

    def get_number_of_sold_beds(self, day):
        """
        Get number of beds paid for koie on date
        """
        from koie_booking.models.booking import BookingModel

        paid_bookings = BookingModel.objects.filter(
            koie=self, paid=True, arrival_date__lte=day, departure_date__gt=day
        )
        guests_member = paid_bookings.aggregate(models.Sum("guests_member"))["guests_member__sum"]
        guests_not_member = paid_bookings.aggregate(models.Sum("guests_not_member"))[
            "guests_not_member__sum"
        ]
        member_sum = guests_member if guests_member else 0
        not_member_sum = guests_not_member if guests_not_member else 0
        return member_sum + not_member_sum
