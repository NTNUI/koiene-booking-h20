from django.template.defaultfilters import slugify
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from koie_booking.models.koie import KoieModel
from koie_booking.serializers.all_koier import KoierSerializer
from koie_booking.serializers.koie import KoieSerializer

from django.utils.translation import gettext as _


class KoieViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet,
):
    queryset = KoieModel.objects.all()
    serializer_class = KoieSerializer
    lookup_field = "slug"

    def list(self, request):
        """ List all koier """
        serializer = KoierSerializer(self.queryset, context={"request": request}, many=True)
        return Response({"koier": serializer.data})

    def retrieve(self, request, slug):
        """ Retrieve one koie from slug """
        try:
            slug = slugify(slug)
            koie = self.queryset.get(slug=slug)
            serializer = KoieSerializer(koie, context={"request": request})
            return Response({"koie": serializer.data})
        except KoieModel.DoesNotExist:
            return Response({"detail": _("Koie not found.")}, status=404)
