from enum import Enum

from enumchoicefield import ChoiceEnum


class MembershipType(ChoiceEnum):
    leader = "Leader"
    deputy_leader = "Deputy Leader"
    cashier = "Cashier"
    board_member = "Board Member"
    deputy_board_member = "Deputy Board Member"
    volunteer = "Volunteer"
    member = "Member"

    @classmethod
    def board_members(cls):
        return [
            cls.leader,
            cls.deputy_leader,
            cls.cashier,
            cls.board_member,
            cls.deputy_board_member,
        ]

    @classmethod
    def singular_board_members(cls):
        return [cls.leader, cls.deputy_leader, cls.cashier]

    def to_norwegian(self):
        if self == MembershipType.leader:
            return "leder"
        elif self == MembershipType.deputy_leader:
            return "nestleder"
        elif self == MembershipType.cashier:
            return "kasserer"
        elif self == MembershipType.board_member:
            return "styremedlem"
        elif self == MembershipType.deputy_board_member:
            return "varastyremedlem"
        elif self == MembershipType.volunteer:
            return "frivillig"
        return "medlem"


class GroupCategory(ChoiceEnum):
    sports_group = "Sports Group"
    administrative_group = "Administrative Group"


class SubmembershipType(ChoiceEnum):
    leader = "Leader"
    admin = "Admin"
    volunteer = "Volunteer"
    member = "Member"

    @classmethod
    def subgroup_board_members(cls):
        return [cls.leader, cls.admin]


class ContractType(ChoiceEnum):
    student_membership = "Student Membership"
    former_student_membership = "Former Student Membership"
    ntnu_member = "NTNU Membership"
    honorary_member = "Honorary Membership"
    external_member = "External Membership"
    other_member = "Other Membership"


class KoieType(ChoiceEnum):
    kaate = "kåte"
    koie = "koie"


class DifficultyType(ChoiceEnum):
    one = 1
    two = 2
    three = 3
    four = 4
    five = 5


class KeyStatus(ChoiceEnum):
    not_picked_up = "Not picked up"
    picked_up = "Picked up"
    delivered = "Delivered back"


GENDER_CHOICES = (("M", "Male"), ("F", "Female"), ("-", "N/A"))

LANGUAGE_CHOICES = (("nb", "Norwegian"), ("en", "English"))

ACCESS_CHOICES = (("O", "Open"), ("C", "Closed"), ("H", "Hidden"))


class Access(Enum):
    all = 1
    members = 2
    leaders = 3
    admin = 4


class EnvironmentOptions(Enum):
    BASE = "BASE"
    LOCAL = "LOCAL"
    DEVELOPMENT = "DEVELOPMENT"
    PRODUCTION = "PRODUCTION"


class UpdateUsersTypes(Enum):
    EXCELINE = "EXCELINE"
