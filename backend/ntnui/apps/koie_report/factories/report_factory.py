from django.utils.timezone import now
from koie_report.models import KoieReportModel
from koie_booking.factories.booking_factory import BookingFactory
import factory.django


class ReportFactory(factory.DjangoModelFactory):
    class Meta:
        model = KoieReportModel
        django_get_or_create = ('booking', 'date_created_at', 'feedback',
                                'firewoord',
                                'firewood', 'chopped_up_wood',
                                'smoke_detector_is_working',
                                'gas_is_full',
                                'gas_burner_primus', 'axe', 'hammer', 'saw',
                                'saw_blade', 'saw_bench', 'spade',
                                'kerosene_lamp',
                                'detergent', 'dishware', 'cookware',
                                'cabin_book', 'candle_holders',
                                'fire_blanket', 'fire_extinguisher',
                                'boat_status', 'canoe_status',
                                'life_jackets_status')

    booking = factory.SubFactory(BookingFactory)
    date_created_at = now()
    feedback = " "
    firewood = 0
    chopped_up_wood = 0
    smoke_detector_is_working = True
    gas_is_full = True
    gas_burner_primus = 0
    axe = 0
    hammer = 0
    saw = 0
    saw_blade = 0
    saw_bench = 0
    spade = 0
    kerosene_lamp = 0
    detergent = 0
    dishware = 0
    cookware = 0
    cabin_book = 0
    candle_holders = 0
    fire_blanket = 0
    fire_extinguisher = 0
    other_faults = " "
    boat_status = 0
    canoe_status = 0
    life_jackets_status = 0
