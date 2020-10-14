from django.core.management.base import BaseCommand

from koie_booking.reminder import send_departure_report_reminder


class Command(BaseCommand):
    """ Command to send reminders to all contact emails connected to a booking departing today """

    help = "Send report reminder email to all departing bookings"

    def handle():
        send_departure_report_reminder()
