import datetime
from koie_booking.models.booking import BookingModel
from koie_booking.utils import mail_utils

def reminder_job():
    queries = BookingModel.objects.filter(departure_date=datetime.date.today())
    for booking in queries:
        mail_utils.send_reminder_mail(booking)
    