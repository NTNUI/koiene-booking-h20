from rest_framework.pagination import PageNumberPagination


class PageSize20(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"


class PageSize100(PageNumberPagination):
    page_size = 100
    page_size_query_param = "page_size"


class PageSize7(PageNumberPagination):
    page_size = 7
    page_size_query_param = "page_size"
