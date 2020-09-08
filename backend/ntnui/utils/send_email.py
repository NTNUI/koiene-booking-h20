from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from django.utils.html import strip_tags


def send_email(**kwargs):
    html_content = render_to_string(kwargs["path"], kwargs["data"])
    text_content = strip_tags(html_content)

    # create the email, and attach the HTML version as well.
    msg = EmailMultiAlternatives(
        kwargs["subject"], text_content, "noreply@mg.ntnui.no", kwargs["to"]
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
