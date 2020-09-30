from django.db import models


class GuestModel(models.Model):
    email = models.CharField(max_length=40, null=True)
    phone_number = models.IntegerField(null=True)

    class Meta:
        verbose_name = "Guest"
        verbose_name_plural = "Guests"

def get_default_guest():
        return {
        'name': ' ',
        'number': ' ',
        "email": "to1@example.com",
        'isMember': True
        }