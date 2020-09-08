from django.test import TestCase

from accounts.models.user import UserModel
from accounts.serializers.user import UserSerializer


class UserSerializerTestCase(TestCase):
    def setUp(self):
        self.user_attributes = {
            "first_name": "Sprint",
            "last_name": "Fast",
            "email": "Sprint@ntnui.no",
        }

        self.serialized_data = {
            "first_name": "Sprint",
            "last_name": "Fast",
            "email": "Sprint@ntnui.no",
        }

        self.user = UserModel.objects.create(**self.user_attributes)
        self.serializer = UserSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        expected_fields = {"first_name", "last_name", "email", "ntnui_no"}

        # asserts that the arguments are equivalent sets
        self.assertCountEqual(data.keys(), expected_fields)

    def test_first_name_field_content(self):
        data = self.serializer.data

        self.assertEqual(data["first_name"], self.user_attributes["first_name"])

    def test_last_name_field_content(self):
        data = self.serializer.data

        self.assertEqual(data["last_name"], self.user_attributes["last_name"])

    def test_email_field_content(self):
        data = self.serializer.data

        self.assertEqual(data["email"], self.user_attributes["email"])
