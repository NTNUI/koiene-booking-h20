from datetime import datetime

import pytz

from ntnui.utils.constants import NTNUI_FOUNDING_DATE


def test_ntnui_founding_date():

    assert NTNUI_FOUNDING_DATE == datetime(year=1910, month=10, day=25, tzinfo=pytz.UTC)
