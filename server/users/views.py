from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
from .models import CustomUser
from listing.serializer import AuthorSerializer

class UserList(generics.ListAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=AuthorSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=AuthorSerializer

class UserUpdate(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AuthorSerializer
    permission_classes=(IsAuthenticatedOrReadOnly, )
