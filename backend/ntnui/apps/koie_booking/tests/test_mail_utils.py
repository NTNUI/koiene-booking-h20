import pytest
from django.core import mail
from django.template.loader import render_to_string

from koie_booking.factories.booking_factory import BookingFactory
from koie_booking.utils.mail_utils import send_confirmation_mail, send_koie_information_mail


@pytest.fixture
def booking():
    return BookingFactory.build()


@pytest.fixture
def outbox():
    """Resetting outbox"""
    mail.outbox = []
    return mail.outbox


def test_send_confirmation_mail(booking, outbox):
    """ Test to verify email content and delivery upon the creation of a new booking """
    send_confirmation_mail(booking)

    context = {
        "booking": booking,
    }
    mail_body_plain = render_to_string("booking_confirmation.txt", context)

    assert len(outbox) == 1
    assert outbox[0].subject == "Confirmation email"
    assert outbox[0].body == mail_body_plain
    assert outbox[0].from_email == "noreply@mg.ntnui.no"
    assert outbox[0].to == [booking.user.email]


def test_koie_information_mail(booking, outbox):
    """
        Test the mailing function sending out info on koie
    """
    send_koie_information_mail(booking)

    context = {
        "koie": booking.koie,
    }

    mail_body_plain = render_to_string("koie_information.txt", context)

    assert len(outbox) == 1
    assert outbox[0].subject == "Koie information"
    assert outbox[0].body == mail_body_plain
    assert outbox[0].from_email == "noreply@mg.ntnui.no"
    assert outbox[0].to == [booking.user.email]
