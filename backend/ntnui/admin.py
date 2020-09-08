from nested_admin import NestedModelAdmin

from django.contrib import admin

SKIP_FIELDS = ["password", "last_login", "is_superuser", "is_admin", "is_staff"]


class NtnuiAdmin(NestedModelAdmin):
    """ Simple configuration """

    admin.site.site_header = "NTNUI Admin"
    admin.site.site_title = "NTNUI Site Admin"
    admin.site.index_title = "Welcome to the NTNUI Admin Portal"
