from django.db import models
from koie_booking.models.booking import BookingModel
# Create your models here.

class KoieReportModel(models.Model):
    booking = models.ForeignKey(BookingModel, on_delete=models.CASCADE)
    # For when report was created
    date_created_at = models.DateField(auto_now=True)
    # Further comment on faults
    comment = models.TextField(blank=True)
    # Will add choices later 
    wood = models.IntegerField()
    # Will add choices later where a user can choose wether smoke detector work or not, or "don't know"
    smoke_detector = models.CharField(max_length = 100) 
    # Will add choices later 
    gas = models.IntegerField()

