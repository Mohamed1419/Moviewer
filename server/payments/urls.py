from django.urls import path
from .views import CreateCheckoutSessionView

urlpatterns = [
    path('create_checkout_session/', CreateCheckoutSessionView.as_view(), name='create_checkout_session'),
    
]
