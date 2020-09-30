import pytest
from koie_report.factories.report_factory import ReportFactory


@pytest.fixture()
def koie_report():
    return ReportFactory()
