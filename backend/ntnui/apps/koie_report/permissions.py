from rest_framework import permissions

from groups.models.group import GroupModel

# koie_members = GroupModel.objects.get(name="Koiene").members.all().values()


class IsKoieMemberOrWriteOnly(permissions.BasePermission):
    """
    Custom permission:
        - allow anonymous POST
        - allow authenticated GET only for board members of koie grouå
    """

    def has_permission(self, request, view):
        koie_group = GroupModel.objects.get(slug="koiene")
        if view.action == "create":
            return True
        else:
            return (
                request.user.is_authenticated
                and koie_group
                and koie_group.get_membership(request.user)
                and koie_group.get_membership(request.user).is_board_member()
            )
