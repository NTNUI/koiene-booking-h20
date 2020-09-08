from rest_framework import permissions

from ntnui.enums import MembershipType


class IsGroupLeader(permissions.BasePermission):
    """Checks that user is the group leader"""

    message = "You are not a leader for the group"

    def has_object_permission(self, request, view, obj):
        """Checks that user is the group leader"""
        return (
            request.user.is_authenticated
            and obj
            and obj.get_membership(request.user)
            and obj.get_membership(request.user).type == MembershipType.leader
        )


class IsBoardMember(permissions.BasePermission):
    """Checks that user is a board member"""

    message = "You are not a board member for the group"

    def has_object_permission(self, request, view, obj):
        """Checks that user is a board member"""
        return (
            request.user.is_authenticated
            and obj
            and obj.get_membership(request.user)
            and obj.get_membership(request.user).is_board_member()
        )


class IsGroupMember(permissions.BasePermission):
    """Checks that user is member of the group"""

    message = "You are not a member of the group"

    def has_object_permission(self, request, view, obj):
        """Checks that user is member of the group"""
        return request.user.is_authenticated and obj and obj.get_membership(request.user)


class IsAdminUser(permissions.BasePermission):
    """Checks that user is Admin"""

    message = "You need admin permission to access this"

    def has_permission(self, request, view):
        return request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser
