from django.forms.models import BaseInlineFormSet, ModelForm

from groups.models.group import GroupModel
from ntnui.admin import NtnuiAdmin

from django.contrib import admin


class RequiredInlineFormSet(BaseInlineFormSet):
    def _construct_form(self, i, **kwargs):
        form = super(RequiredInlineFormSet, self)._construct_form(i, **kwargs)
        form.empty_permitted = False
        return form


class ForceChangeForm(ModelForm):
    """ Override the has_changed method in order to always save the default media """

    def has_changed(self):
        return True


@admin.register(GroupModel)
class GroupAdmin(NtnuiAdmin):
    search_fields = ["name", "founding_date"]
    exclude = (
        "meta",
        "media",
    )

    list_display = ("name", "access")
    list_filter = ("access",)
