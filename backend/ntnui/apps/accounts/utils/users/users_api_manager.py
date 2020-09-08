import logging

from django.core.exceptions import ValidationError

from accounts.models.contract import Contract
from accounts.models.user import UserModel
from accounts.utils.users.apis.exceline_api import ExcelineAPI
from ntnui.enums import UpdateUsersTypes

RESTRICTED_USER_FIELDS = ["is_admin", "is_superuser", "is_staff"]


class UserAPIManager:
    new_users = None
    current_users = None
    api = None

    def __init__(self, api_type=UpdateUsersTypes.EXCELINE):
        if api_type == UpdateUsersTypes.EXCELINE:
            self.api = ExcelineAPI()
        else:
            raise ValueError("Invalid type")

    def fetch_from_api(self, **kwargs):
        """ Fetch users from the select api. """

        logging.info(f"Fetching users using {self.api}")
        self.new_users = self.api.fetch_from_api(**kwargs)
        logging.info("Users fetched")

        # If user_upsert is set, update the database
        if "user_upsert" in kwargs and kwargs["user_upsert"]:
            self._update_database()
        else:
            return self.new_users

    def _update_database(self):
        """ Update database based on the new_user list """

        # Get all current users, including contracts
        self.current_users = UserModel.objects.all().prefetch_related("contracts")

        # If user exist update, else create
        for new_user in self.new_users:
            user_found = False
            for current_user in self.current_users:
                if UserAPIManager.is_user_equal(new_user, current_user):
                    UserAPIManager._update_user(new_user, current_user)
                    if "contract" in new_user:
                        UserAPIManager.create_contract_if_not_present(
                            current_user, new_user["contract"]["expiry_date"]
                        )
                    user_found = True
                    continue
            if not user_found:
                UserAPIManager._create_user(new_user)

    @staticmethod
    def _create_user(user_data):
        """ Inserts a new user into the database """

        # Set user access properties, ensure that new users can not get admin access
        user_data["is_active"] = True

        try:
            # Create new user
            user = UserModel.objects.create(email=user_data["email"])
            UserAPIManager._update_user(user_data, user)

            if "contract" in user_data:
                Contract.objects.create(user=user, expiry_date=user_data["contract"]["expiry_date"])

        except KeyError as e:
            # Get an instance of a logger
            logging.warning(f"Invalid user data for {user_data}")
            logging.warning(e)

    @staticmethod
    def _update_user(new_user, current_user):
        """ Updates a single user base on new_user dict """
        for field in [
            field.name
            for field in UserModel._meta.fields
            if field.name not in RESTRICTED_USER_FIELDS
        ]:
            if field in new_user:
                current_user.__setattr__(field, new_user[field])
        try:
            # Ensure that the entry is validated
            current_user.clean()

            # Save the entry
            current_user.save()

        except ValidationError as e:
            logging.warning(f"Invalid data format for user with email: {new_user['email']}")
            logging.warning(e)

    @staticmethod
    def create_contract_if_not_present(user, expiry_date):
        if (
            len(
                [
                    contract
                    for contract in user.contracts.values()
                    if contract["expiry_date"] == expiry_date.date()
                ]
            )
            == 0
        ):
            Contract.objects.create(user=user, expiry_date=expiry_date)

    @staticmethod
    def is_user_equal(new_user, current_user):
        """ Validate if a user exist based on a given criteria """
        # Fields used to validate if a user exist
        fields_to_validate = ("email", "customer_no", "card_no", "phone_number")

        for field in fields_to_validate:
            if field in new_user.keys() and new_user[field] == getattr(current_user, field):
                return True
        return False
