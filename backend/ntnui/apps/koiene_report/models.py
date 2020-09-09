from django.db import models

# Create your models here.
class ReportModel(models.Model):
    # Every report should contain exactly one koie object
    koie = models.ForeignKey(KoieModel, null=True, on_delete=models.CASCADE)
    
    # Attributes with the rest of the questions will be implemented here