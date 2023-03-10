from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .permissions import IsAuthorOrReadOnly
# Create your views here.
from .models import Listing
from .serializer import ListingSerializer

class ListingList(generics.ListCreateAPIView):
    queryset=Listing.objects.all()
    serializer_class=ListingSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

class ListingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Listing.objects.all()
    serializer_class=ListingSerializer
    permission_classes=(IsAuthorOrReadOnly | IsAdminUser, )