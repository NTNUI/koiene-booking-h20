from datetime import date

import phonenumbers
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from accounts.utils import user_manager
from ntnui.enums import GENDER_CHOICES, LANGUAGE_CHOICES

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin


class UserModel(AbstractBaseUser, PermissionsMixin):
    """ A model to handle user-accounts """

    objects = user_manager.CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    """ User details """
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    date_of_birth = models.DateField(null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default="-")

    """ Customer details """
    # Auto-generate ntnui numbers and use as primary key
    ntnui_no = models.AutoField(primary_key=True, editable=False)

    # Customer number from SiT
    customer_no = models.CharField(max_length=20, unique=True, null=True, blank=True)

    # Register date from SiT
    register_date = models.DateField(default=date.today)

    # Card number from SiT
    card_no = models.CharField(max_length=50, null=True, blank=True)

    """ User preferences """
    language = models.CharField(max_length=5, default="no", choices=LANGUAGE_CHOICES)

    """ Contact details """
    phone_number = PhoneNumberField(null=True)
    email = models.EmailField(max_length=100, verbose_name="email", unique=True)
    contact_email = models.EmailField(
        max_length=100, verbose_name="contact email", blank=True, null=True
    )

    class Meta:

        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        """ The name of the user """
        return self.first_name.title() + " " + self.last_name.title()

    def get_full_name(self):
        """Return the full name for the user"""
        return str(self)

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name.title()

    def get_contact_email(self):
        """ Returns the contact email if possible, else fallback to primary email"""
        return self.contact_email if self.contact_email else self.email

    def get_phone_number(self, formatted=False):
        """ Return the phone_number object """

        if formatted:
            return phonenumbers.format_number(
                self.phone_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL
            )

        return self.phone_number

    def has_membership(self, membership_type):
        """ Checks if the user a membership with the given membership_type to any group """

        from groups.models import MembershipModel

        user_memberships = MembershipModel.objects.filter(member=self, type=membership_type)
        return user_memberships.exists()
