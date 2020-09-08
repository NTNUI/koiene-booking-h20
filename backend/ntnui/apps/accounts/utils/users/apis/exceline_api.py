import logging
import os
from datetime import datetime

import requests


class ExcelineAPI:
    def __init__(self):
        # Get token and systemID from environment variables
        self.token = os.environ["SIT_TOKEN"]
        self.system_id = os.environ["SIT_SYSTEM_ID"]

    def __str__(self):
        return "Exceline api controller"

    def fetch_from_api(self, since_days=1, **kwargs):
        response = requests.get(self._get_url(since_days))
        return list(
            map(self._format_user, response.json()["NTNUIGetMemberDataChangesResult"]["Members"])
        )

    def _get_url(self, since_days):
        return (
            f"https://exceline.net/API/Members/NtnuiMemberChanges/{self.system_id}/{since_days}"
            f"/{self.token}"
        )

    @staticmethod
    def _find_gender(gender):
        """ Finds the enum value for gender"""
        if gender == "MALE":
            gender = "M"
        elif gender == "FEMALE":
            gender = "F"
        else:
            gender = "-"
        return gender

    @staticmethod
    def _format_user(user):
        try:
            return {
                "first_name": user.get("FirstName", "").capitalize(),
                "last_name": user.get("LastName", "").capitalize(),
                "email": user.get("Email", "").lower(),
                "date_of_birth": ExcelineAPI._format_date(user.get("BirthDate", None)),
                "customer_no": user.get("CustomerNo", None),
                "register_date": ExcelineAPI._format_date(user.get("RegisterdDate", None)),
                "gender": ExcelineAPI._find_gender(user.get("Gender", "-")),
                "card_no": user.get("CardNumber", None),
                "phone_number": ExcelineAPI._format_phone_number(
                    country_code=user.get("CountryCode", None), mobile=user.get("Mobile", None)
                ),
                "post_code": user.get("post_code", None),
                "contract": {
                    "no": user.get("ContractNumber", None),
                    "expiry_date": ExcelineAPI._format_date(user.get("ExpieryDate", None)),
                },
            }
        except KeyError as error:
            # Get an instance of a logger
            logger = logging.getLogger(__name__)
            logger.warning(f"Invalid user data for {user}")
            logger.warning(error)
            return None

    @staticmethod
    def _format_date(date):
        """ Converts string-date to datetime object"""
        if not isinstance(date, str) or len(date) == 0:
            return None
        return datetime.strptime(date, "%Y.%m.%d")

    @staticmethod
    def _format_phone_number(country_code, mobile):
        """ Sets appropriate format of phone number, None if mobile does not exist """
        if not mobile:
            return None
        if country_code:
            return country_code + mobile
        return mobile
