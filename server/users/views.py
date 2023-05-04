from .serializers import UserSerializer
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
from .models import CustomUser
from listing.serializer import AuthorSerializer

User = get_user_model()


class UserList(generics.ListAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=AuthorSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=AuthorSerializer


class UserUpdate(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = jwt.encode(
                {'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
            serializer.save()
            return Response({'message': 'Registration successful', 'token': token})

        return Response(serializer.errors, status=422)




class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode(
            {'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})
