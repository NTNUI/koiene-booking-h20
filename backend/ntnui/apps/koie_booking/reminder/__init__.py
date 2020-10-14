import datetime
from koie_booking.models.booking import BookingModel
from koie_booking.utils import mail_utils


def send_departure_report_reminder():
    todays_departures = BookingModel.objects.filter(departure_date=datetime.date.today())
    for booking in todays_departures:
        mail_utils.send_departure_reminder_mail(booking)
