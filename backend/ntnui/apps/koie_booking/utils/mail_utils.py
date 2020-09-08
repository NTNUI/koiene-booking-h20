from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_confirmation_mail(booking):
    """ Sends confirmation email to users and guests who signs up for events and sub-events. """

    # Mail header.
    sender = "noreply@mg.ntnui.no"
    receiver = [booking.user.email]
    subject = "Confirmation email"

    context = {"booking": booking}

    # Mail body.
    plain_message = render_to_string("booking_confirmation.txt", context)
    html_message = render_to_string("booking_confirmation.html", context)

    send_mail(subject, plain_message, sender, receiver, html_message=html_message)


def send_koie_information_mail(booking):
    """ Sends koie information to person who made booking. """

    # Mail header.
    sender = "noreply@mg.ntnui.no"
    receiver = [booking.user.email]
    subject = "Koie information"

    context = {"koie": booking.koie}

    # Mail body.
    plain_message = render_to_string("koie_information.txt", context)
    html_message = render_to_string("koie_information.html", context)

    send_mail(subject, plain_message, sender, receiver, html_message=html_message)
