import pytest
from koie_report.factory.report_factories import ReportFactory


@pytest.fixture()
def koie_report():
    return ReportFactory()
