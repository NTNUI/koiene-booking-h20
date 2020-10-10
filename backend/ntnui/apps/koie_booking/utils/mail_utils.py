from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def send_confirmation_mail(booking):
    """ Sends confirmation email to the person responsible for the trip. """

    # Mail header.
    sender = "TestKoieneNTNUI@gmail.com"
    receiver = [booking.contact_email]

    subject = "Confirmation email"

    context = {"booking": booking}

    # Mail body.

    text_content = render_to_string("booking_confirmation.txt", context)
    html_content = render_to_string("booking_confirmation.html", context)
    msg = EmailMultiAlternatives(subject, text_content, sender, receiver)
    msg.attach_alternative(html_content, "text/html")
    msg.send(fail_silently=False)


def send_koie_information_mail(booking):
    """ Sends koie information to person responsible for the trip. """

    # Mail header.
    sender = "TestKoieneNTNUI@gmail.com"
    receiver = [booking.contact_email]

    subject = "Koie information"

    context = {"koie": booking.koie, "id": booking.id}

    # Mail body.

    text_content = render_to_string("koie_information.txt", context)
    html_content = render_to_string("koie_information.html", context)
    msg = EmailMultiAlternatives(subject, text_content, sender, receiver)
    msg.attach_alternative(html_content, "text/html")
    msg.send(fail_silently=False)
