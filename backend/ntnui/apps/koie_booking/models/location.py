from django.db import models


class Location(models.Model):
    latitude = models.CharField(max_length=40, null=True)
    longitude = models.CharField(max_length=40, null=True)
    area = models.CharField(max_length=40, null=True)

    difficulty_info_nor = models.TextField(null=True)
    difficulty_info_eng = models.TextField(null=True)

    terrain_nor = models.CharField(max_length=50, null=True)
    terrain_eng = models.CharField(max_length=50, null=True)
    altitude = models.IntegerField(null=True)
    utm = models.CharField(max_length=40, null=True)

    kartblad = models.TextField(null=True)
    map_pdf = models.TextField(null=True)

    class Meta:
        verbose_name = "Location"
        verbose_name_plural = "Locations"
