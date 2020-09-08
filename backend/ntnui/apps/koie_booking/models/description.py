from django.db import models


class Description(models.Model):
    yr_link_nor = models.TextField(null=True)
    yr_link_eng = models.TextField(null=True)

    description_nor = models.TextField(null=True)
    description_eng = models.TextField(null=True)

    directions_nor = models.TextField(null=True)
    directions_eng = models.TextField(null=True)

    parking_nor = models.TextField(null=True)
    parking_eng = models.TextField(null=True)

    class Meta:
        verbose_name = "Description"
        verbose_name_plural = "Descriptions"
