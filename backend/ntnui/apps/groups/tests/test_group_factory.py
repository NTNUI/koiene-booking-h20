import pytest

from groups.factories.group_factory import GroupFactory


@pytest.mark.django_db
@pytest.mark.parametrize(
    ("group_name", "expected"),
    [("American Football", "american-football"), ("Triathlon", "triathlon")],
)
def test_slug_generation(group_name, expected):
    """Test that slug is lower-case of group name """

    group = GroupFactory(name=group_name)

    assert group.slug == expected


@pytest.mark.django_db
def test_access_iterator():
    """Test the access of the group"""

    assert GroupFactory().access == "O"
    assert GroupFactory(access="C").access == "C"
    assert GroupFactory(access="H").access == "H"
