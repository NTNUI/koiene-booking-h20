from django.db import models
from koie_booking.models.booking import BookingModel
class ReportModel(models.Model):
    # Every report should contain exactly one booking object
    booking = models.ForeignKey(BookingModel, null = False, on_delete=models.CASCADE)
    # Date for when report was submitted and saved to database. auto_now makes sure to set the date
    date_created_at = models.DateField(auto_now= True)
    # Additional comments on faults, optional
    comment = models.TextField(blank = True, null = True)
    # Ranging between 1-3 on amount of wood. 3 means a lot/enough wood
    STATUS_CHOICES = (
        (1, "Low"), (2, "Medium"), (3, "High")
    )
    wood = models.IntegerField(choices=STATUS_CHOICES, default = 1)

    # Checkbox field. True means that the gas tank is empty. False means that it is full.
    # The user has to check the checkbox if it is 
    gas= models.BooleanField(default=False)
    CHOICES = (
        ("Y", "Yes"),("N", "No"),("None", "Don't know")
    )
    # Radiobutton selection on if the smoke detector worked 
    smoke_detector = models.CharField(max_length = 4, choices = CHOICES, default= "None")
