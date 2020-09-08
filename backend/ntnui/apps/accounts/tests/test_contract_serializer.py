import pytest
from django.test import TestCase

from accounts.models import Contract, UserModel
from accounts.serializers.contract import ContractSerializer


class ContractSerializerTestCase(TestCase):
    def setUp(self):
        """ Sets up initial data for testing """

        self.user = UserModel.objects.create(first_name="Sprint", last_name="Sprintvik")

        self.contract_attributes = {"expiry_date": None, "user": self.user}

        self.serialized_data = {
            "expiry_date": "2020-08-10",
            "type": "student_membership",
            "user": self.user.ntnui_no,
        }

        self.contract = Contract.objects.create(**self.contract_attributes)
        self.serializer = ContractSerializer(instance=self.contract)

    @pytest.mark.django_db
    def test_contains_expected_fields(self):
        """ Making sure that the serializer contains exactly the set of expected fields """

        data = self.serializer.data
        expected_fields = {"expiry_date", "type"}

        # asserts that the arguments are equivalent sets
        self.assertCountEqual(data.keys(), expected_fields)

    @pytest.mark.django_db
    def test_expiry_date(self):

        self.serialized_data["expiry_date"] = "2021-01-10"

        serializer = ContractSerializer(data=self.serialized_data)

        self.assertTrue(serializer.is_valid())
        self.assertCountEqual(serializer.errors, [])

    @pytest.mark.django_db
    def test_expiry_date_with_invalid_date(self):

        self.serialized_data["expiry_date"] = "2020-14-14"

        serializer = ContractSerializer(data=self.serialized_data)

        self.assertFalse(serializer.is_valid())
        self.assertCountEqual(serializer.errors, ["expiry_date"])

    @pytest.mark.django_db
    def test_expiry_date_with_text_value(self):

        self.serialized_data["expiry_date"] = "a random text"

        serializer = ContractSerializer(data=self.serialized_data)

        self.assertFalse(serializer.is_valid())
        self.assertCountEqual(serializer.errors, ["expiry_date"])

    @pytest.mark.django_db
    def test_type(self):

        self.serialized_data["type"] = "student_membership"

        serializer = ContractSerializer(data=self.serialized_data)

        self.assertTrue(serializer.is_valid())
        self.assertCountEqual(serializer.errors, [])
