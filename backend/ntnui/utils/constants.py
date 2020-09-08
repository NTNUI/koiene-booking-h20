from datetime import datetime

import pytz

# To be used for default datetime values. Datetime is used to create compatibility with both
# datetime and date fields.
NTNUI_FOUNDING_DATE = datetime(year=1910, month=10, day=25, tzinfo=pytz.UTC)
