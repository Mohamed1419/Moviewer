from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Listing


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username',)

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Listing
        fields=('id', 'movie_id', 'author', 'price', 'sold')

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['author']=UsersSerializer(instance.author).data
        return response

class AuthorSerializer(serializers.ModelSerializer):
    listings = ListingSerializer(many=True, read_only=True)

    class Meta:
        model=get_user_model()
        fields=('id','username', 'email', 'first_name', 'last_name', 'name', 'listings',)
