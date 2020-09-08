from ntnui.admin import NtnuiAdmin
from payments.models.stripe_transaction import StripeTransaction

from django.contrib import admin


@admin.register(StripeTransaction)
class StripeTransactionAdmin(NtnuiAdmin):

    search_fields = ["charge_id", "token_id"]
    fields = ["pk", "stripe_status", "is_paid", "get_buyer", "get_seller",] + search_fields
    list_display = ("pk", "is_paid", "get_buyer", "get_seller")
    readonly_fields = (
        "pk",
        "is_paid",
        "get_buyer",
        "get_seller",
        "is_paid",
        "stripe_status",
        "charge_id",
    )

    def has_change_permission(self, request, obj=None):
        """ Method makes it impossible to change membership payment objects in the admin panel."""
        return False

    def has_delete_permission(self, request, obj=None):
        """ Method makes it impossible to delete membership payment objects in the admin panel."""
        return False

    def has_add_permission(self, request, obj=None):
        """ Method makes it impossible to add membership payment objects in the admin panel."""
        return False
