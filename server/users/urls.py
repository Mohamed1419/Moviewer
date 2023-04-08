from django.urls import path

from .views import RegisterView, LoginView, UserDetail, UserList, UserUpdate

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('', UserList.as_view(), name='users_list'),
    path('details/<int:pk>/', UserDetail.as_view(), name='user'),
    path('update/<int:pk>/', UserUpdate.as_view(), name='update'),
]
