import pytest
from django.template.loader import render_to_string

from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.utils.mail_utils import send_confirmation_mail, send_koie_information_mail


@pytest.fixture
def booking():
    return BookingFactory.build()


def test_send_confirmation_mail(booking, mailoutbox):
    """ Test to verify email content and delivery upon the creation of a new booking """
    send_confirmation_mail(booking)

    context = {
        "booking": booking,
        "id": booking.id,
    }
    mail_body_plain = render_to_string("booking_confirmation.txt", context)

    assert len(mailoutbox) == 1
    assert mailoutbox[0].subject == "Confirmation email"
    assert mailoutbox[0].body == mail_body_plain
    assert mailoutbox[0].from_email == "TestKoieneNTNUI@gmail.com"
    assert mailoutbox[0].to == [booking.contact_email]


def test_koie_information_mail(booking, mailoutbox):
    """
        Test the mailing function sending out info on koie
    """
    send_koie_information_mail(booking)

    context = {
        "koie": booking.koie,
        "id": booking.id,
    }

    mail_body_plain = render_to_string("koie_information.txt", context)

    assert len(mailoutbox) == 1
    assert mailoutbox[0].subject == "Koie information"
    assert mailoutbox[0].body == mail_body_plain
    assert mailoutbox[0].from_email == "TestKoieneNTNUI@gmail.com"
    assert mailoutbox[0].to == [booking.contact_email]
