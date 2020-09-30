
# import json
from koie_report.models import KoieReportModel
from koie_report.report_serializer import ReportSerializer
# from koie_booking.models.booking import BookingModel
# from django.test import TestCase
from rest_framework.test import APITestCase, Client
from django.utils.timezone import now
from django.urls import reverse

client = Client()


class KoieReportTestCase(APITestCase):
    # def setUp(self):
    #     self.booking = BookingModel.objects.get(pk=1)
    #     self.date_created_at = now()
    #     self.feedback = "No feedback needed."
    #     self.firewood = 2
    #     self.chopped_up_wood = 4
    #     self.smoke_detector_is_working = True
    #     self.gas_is_full = False
    #     self.gas_burner_primus = 4
    #     self.axe = 2
    #     self.hammer = 1
    #     self.saw = 0
    #     self.saw_blade = 0
    #     self.saw_bench = 0
    #     self.spade = 0
    #     self.kerosene_lamp = 0
    #     self.detergent = 0
    #     self.dishware = 0
    #     self.cookware = 0
    #     self.cabin_book = 0
    #     self.candle_holders = 0
    #     self.fire_blanket = 0
    #     self.fire_extinguisher = 0
    #     self.other_faults = "No other faults."
    #     self.boat_status = 0
    #     self.canoe_status = 0
    #     self.life_jackets_status = 0
    #     self.koie_report = KoieReportModel.objects.create(
    #         booking=self.booking,
    #         date_created_at=self.date_created_at, feedback=self.feedback,
    #         firewood=self.firewood,
    #         chopped_up_wood=self.chopped_up_wood,
    #         smoke_detector_is_working=self.smoke_detector_is_working,
    #         gas_is_full=self.gas_is_full,
    #         gas_burner_primus=self.gas_burner_primus,
    #         axe=self.axe,
    #         hammer=self.hammer,
    #         saw=self.saw,
    #         saw_blade=self.saw_blade,
    #         saw_bench=self.saw_bench,
    #         spade=self.spade,
    #         kerosene_lamp=self.kerosene_lamp,
    #         detergent=self.detergent,
    #         dishware=self.dishware,
    #         cookware=self.cookware,
    #         cabin_book=self.cabin_book,
    #         candle_holders=self.candle_holders,
    #         fire_blanket=self.fire_blanket,
    #         fire_extinguisher=self.fire_extinguisher,
    #         other_faults=self.other_faults,
    #         boat_status=self.boat_status,
    #         canoe_status=self.canoe_status,
    #         life_jackets_status=self.life_jackets_status)

    def test_post_new_report(self):
        url = reverse('koie_create')
        data = {
            "booking": 1,
            "date_created_at": now(),
            "feedback": "No feedback needed..",
            "firewood": 1,
            "chopped_up_wood": 2,
            "smoke_detector_is_working": True,
            "gas_is_full": False,
            "gas_burner_primus": 4,
            "axe": 2,
            "hammer": 1,
            "saw": 3,
            "saw_blade": 0,
            "saw_bench": 0,
            "spade": 0,
            "kerosene_lamp": 0,
            "detergent": 0,
            "dishware": 0,
            "cookware": 0,
            "cabin_book": 2,
            "candle_holders": 0,
            "fire_blanket": 0,
            "fire_extinguisher": 0,
            "other_faults": " ",
            "boat_status": 2,
            "canoe_status": 0,
            "life_jackets_status": 0
        }
        response = self.client.post(url + '/1', data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_retrieve_all_reports(self):
        # get API response
        response = client.get(reverse('koie_report_list'))
        # get data from db
        reports = KoieReportModel.objects.all()
        serializer = ReportSerializer(reports, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, 201)
