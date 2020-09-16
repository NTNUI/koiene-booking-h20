from django.shortcuts import render
from koie_report.models import KoieReportModel
from koie_report.serializers.report_serializer import ReportSerializer
from koie_booking.models.booking import BookingModel
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from rest_framework import status
from rest_framework.decorators import api_view
# Handling get requests
class ReportViewSet(viewsets.GenericViewSet, mixins.ListModelMixin
):
    queryset = KoieReportModel.objects.all()
    serializer_class = ReportSerializer
    def list(self,request):
        reports = KoieReportModel.objects.all()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    def create(self, request, pk):
     # Deserialize 
        serializer = ReportSerializer(data=request.data)
        # Retrieve correct booking instance 
        booking = BookingModel.objects.get(pk = pk)
        if serializer.is_valid():
            # Create a new report instance 
            report = KoieReportModel.objects.create(booking=booking,**serializer.validated_data)
            report.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def report_list(request, pk):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        reports =KoieReportModel.objects.all()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ReportSerializer(data=request.data)
        booking = BookingModel.objects.get(pk = pk)
        if serializer.is_valid():
            report = KoieReportModel.objects.create(booking = booking, **serializer.validated_data)
            report.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Gjøre om function based er best
# class ReportPostViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
#     queryset = KoieReportModel.objects.all()
#     serializer_class = ReportSerializer
    # def create(self, request, booking_id):
    #     # Deserialize 
    #     serializer = ReportSerializer(data=request.data)
    #     # Retrieve correct booking instance 
    #     booking = BookingModel.objects.get(pk = booking_id)
    #     if serializer.is_valid():
    #         # Create a new report instance 
    #         report = KoieReportModel.objects.create(booking = booking, **serializer.validated_data)
    #         report.save()
    #         return Response(serializer.data, status = status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)





