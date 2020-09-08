from django.core.mail import send_mail
from django.template.loader import render_to_string

from ntnui.enums import MembershipType


def new_membership(membership):
    """ Sends confirmation email to users and guests who signs up for events and sub-events. """

    # Mail header.
    sender = "noreply@mg.ntnui.no"
    receiver = [membership.member.email]
    subject = "Welcome"

    context = {"user": membership.member, "group": membership.group}

    # Mail body.
    plain_message = render_to_string("emails/new_membership.txt", context)
    html_message = render_to_string("emails/new_membership.html", context)

    send_mail(subject, plain_message, sender, receiver, html_message=html_message)


def send_gsuite_confirmation_mail(user, contact_email, password):
    # Mail header.
    sender = "noreply@mg.ntnui.no"
    receiver = [user.email]
    subject = "Opprettelse av ny NTNUI-bruker"

    context = {
        "first_name": user.first_name,
        "email": user.email,
        "contact_email": contact_email,
        "password": password,
    }

    # Mail body.
    plain_message = render_to_string("emails/new_gsuite_account.txt", context)
    html_message = render_to_string("emails/new_gsuite_account.html", context)

    send_mail(subject, plain_message, sender, receiver, html_message=html_message)


def send_welcome_mail_to_leader(user, group):
    """ Send a mail to a new leader """
    sender = "noreply@mg.ntnui.no"
    receiver = [user.email]
    subject = f"Velkommen som ny leder i {group}"

    context = {
        "first_name": user.first_name,
        "email": user.get_contact_email(),
        "group": group.name,
    }

    plain_message = render_to_string(
        template_name="emails/new_leader_membership.txt", context=context
    )
    html_message = render_to_string(
        template_name="emails/new_leader_membership.html", context=context
    )

    send_mail(
        subject=subject,
        message=plain_message,
        from_email=sender,
        recipient_list=receiver,
        html_message=html_message,
    )


def send_welcome_mail_to_cashier(user, group):
    """Send a mail to the new cashier"""
    sender = "noreply@mg.ntnui.no"
    receiver = [user.email]
    subject = f"Velkommen som ny kasserer i {group}"

    context = {
        "first_name": user.first_name,
        "email": user.get_contact_email(),
        "group": group.name,
    }

    plain_message = render_to_string(
        template_name="emails/new_cashier_membership.txt", context=context
    )
    html_message = render_to_string(
        template_name="emails/new_cashier_membership.html", context=context
    )

    send_mail(
        subject=subject,
        message=plain_message,
        from_email=sender,
        recipient_list=receiver,
        html_message=html_message,
    )


def send_welcome_mail_to_board_member(user, group):
    """Send a mail to the new cashier"""
    sender = "noreply@mg.ntnui.no"
    receiver = [user.email]
    subject = f"Velkommen som ny tillitsvalgt i {group}"

    context = {
        "first_name": user.first_name,
        "email": user.get_contact_email(),
        "group": group.name,
    }

    plain_message = render_to_string(
        template_name="emails/new_board_membership.txt", context=context
    )
    html_message = render_to_string(
        template_name="emails/new_board_membership.html", context=context
    )

    send_mail(
        subject=subject,
        message=plain_message,
        from_email=sender,
        recipient_list=receiver,
        html_message=html_message,
    )


def send_welcome_mail(membership):
    """ Delegate welcome mail to different board members """
    send_welcome_mail_to_board_member(user=membership.member, group=membership.group)
    if membership.type == MembershipType.leader:
        send_welcome_mail_to_leader(user=membership.member, group=membership.group)

    if membership.type == MembershipType.cashier:
        send_welcome_mail_to_cashier(user=membership.member, group=membership.group)
