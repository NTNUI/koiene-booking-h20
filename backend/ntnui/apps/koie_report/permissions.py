from rest_framework import permissions

from groups.models.group import GroupModel


class IsKoieAdmin(permissions.BasePermission):
    """Checks that user is a board member in NTNUI koiene """

    message = "You must be a board member from koiene."

    def has_object_permission(self, request, view):
        koie_group = GroupModel.objects.get(slug="koiene")
        return (
            request.user.is_authenticated
            and koie_group
            and koie_group.get_membership(request.user)
            and koie_group.get_membership(request.user).is_board_member()
        )


class IsSitMember(permissions.BasePermission):
    """Checks that user is member of the SiT-group"""

    message = "You must be a member of SiT"

    def has_permission(self, request, view):
        sit_group = GroupModel.objects.get(slug="sit")
        return (
            request.user.is_authenticated and sit_group and sit_group.get_membership(request.user)
        )


class IsSitMemberOrKoieAdmin(permissions.BasePermission):
    """Checks that user is member of the SiT-group or is board member of Koiene"""

    message = "You must be member of SiT or Koiene boad member"

    def has_permission(self, request, view):
        return IsKoieAdmin.has_object_permission(
            request.user, request=request, view=view
        ) or IsSitMember.has_permission(request.user, request=request, view=view)
