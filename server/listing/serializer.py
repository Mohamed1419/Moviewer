from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Listing

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model=get_user_model()
        fields=('username',)

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Listing
        fields=('movie_id', 'author', 'price',)

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['author']=AuthorSerializer(instance.author).data
        return response