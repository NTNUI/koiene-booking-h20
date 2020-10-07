import logging

from rest_framework import mixins, viewsets
from rest_framework.response import Response
from stripe.error import StripeError

from groups.permissions import IsAdminUser, IsGroupMember
from payments.models import StripeTransaction
from payments.serializers.stripe_transaction import StripeTransactionSerializer

from django.utils.translation import gettext as _

logger = logging.getLogger(__name__)


class StripeTransactionViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = StripeTransactionSerializer
    permission_classes = (IsGroupMember | IsAdminUser,)
    queryset = StripeTransaction.objects.all()

    def update(self, request, pk):
        """
        Updates a StripeTransaction with a token from Stripe. If the token is a valid Stripe-token
        the StripeTransaction will be able to retrieve and store a charge successfully, meaning that
        the payment is complete.
        """

        logger.info(f"Received request: {request} on pk: {pk}")
        try:
            transaction = StripeTransaction.objects.get(pk=pk)
        except StripeTransaction.DoesNotExist:
            return Response({"detail": _("Could not find transaction")}, status=400)

        serializer = StripeTransactionSerializer(
            transaction, context={"request": request}, many=False, data=request.data
        )

        # Catch all ValidationErrors if invalid, and return an appropriate error response
        serializer.is_valid(raise_exception=True)

        token_id = request.data["token_id"]

        try:
            # TODO: Return to transaction.try_to_create_charge_on_stripe(token_id) once Stripe is sorted out.
            transaction.try_to_bypass_charge_on_stripe(token_id)
        except StripeError:
            logger.error("Could not communicate with Stripe")
            return Response({"detail": _("Could not communicate with payment server")}, status=400)

        logger.info(f"Transaction successfully updated {transaction.stripe_status}")
        return Response({"detail": _(transaction.stripe_status)}, status=200)

    def partial_update(self, request, pk):
        """Returns a response saying that the method is not allowed."""
        logger.info(f"Received PATCH-request on pk: {pk}")
        return Response({"detail": _("Not yet implemented, use PUT")}, status=501)
