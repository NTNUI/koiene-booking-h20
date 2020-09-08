import pytest

from groups.factories.contract_factory import ContractFactory


@pytest.fixture(scope="module")
def contract():
    return ContractFactory.build()


def test_contract_str_method(contract):

    assert str(contract) == f"{contract.user} - {contract.type} to {contract.expiry_date}"
