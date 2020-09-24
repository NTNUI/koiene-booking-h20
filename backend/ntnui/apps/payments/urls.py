from django.urls import include, path
from rest_framework import routers

from payments.views.stripe_transaction import StripeTransactionViewSet

router = routers.DefaultRouter()
router.register("stripetransaction", StripeTransactionViewSet, basename="stripetransaction")

urlpatterns = [
    path("", include(router.urls)),
]
