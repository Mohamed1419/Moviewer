from django.shortcuts import render
from rest_framework import generics

# Create your views here.
from .models import Listing
from .serializer import ListingSerializer

class ListingList(generics.ListCreateAPIView):
    queryset=Listing.objects.all()
    serializer_class=ListingSerializer

class ListingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Listing.objects.all()
    serializer_class=ListingSerializer