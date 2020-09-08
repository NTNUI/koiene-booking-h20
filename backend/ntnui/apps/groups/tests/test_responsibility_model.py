import pytest

from groups.factories.responsibility_factory import ResponsibilityFactory


@pytest.fixture()
def responsibility():
    return ResponsibilityFactory.build()


def test_responsibility_str_method(responsibility):

    membership = responsibility.membership

    assert (
        str(responsibility) == f"{membership.member} - {responsibility.type} for "
        f"{membership.group}"
    )
