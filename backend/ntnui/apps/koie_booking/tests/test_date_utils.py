from datetime import date

import pytest

from koie_booking.utils.date_utils import get_daterange

from django.utils.timezone import now, timedelta


@pytest.mark.parametrize(
    "start_date, end_date, expected",
    [
        (date(2020, 4, 15), date(2020, 4, 17), 2),
        (now().date(), (now().date() + timedelta(4)), 4),
        (date(2090, 4, 15), date(2090, 4, 30), 15),
    ],
)
def test_get_daterange(start_date, end_date, expected):
    dates = list(get_daterange(start_date, end_date))
    assert len(dates) == expected
    assert dates[0] == start_date
    assert dates[1] == start_date + timedelta(1)
    assert dates[-1] == end_date - timedelta(1)
