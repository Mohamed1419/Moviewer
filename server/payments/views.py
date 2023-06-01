from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
from django.shortcuts import redirect
from listing.models import Listing

import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class CreateCheckoutSessionView(APIView):
    def post(self, request):
        listing_id = request.data.get('listing_id')
        title = request.data.get('title')
        # Retrieving the listing object based on the listing_id
        listing = Listing.objects.get(id=listing_id)

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'gbp',
                        'unit_amount': int(listing.price * 100),
                        'product_data': {
                            'name': title,
                            'metadata': {
                                'listing_id': listing.id,
                            },
                        },
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
            cancel_url=settings.SITE_URL + '/?cancelled=true',
        )

        # return redirect(session.url)
        return Response({'session_id': session.id})






# def create_checkout_session(listing, title):
#     session = stripe.checkout.Session.create(
#         payment_method_types=['card'],
#         line_items=[
#             {
#                 'price_data': {
#                     'currency': 'gbp',
#                     'product_data': {
#                         'name': title,
#                         'metadata': {
#                             'listing_id': listing.id,
#                         },
#                     },
#                     'unit_amount': listing.price,
#                 },
#                 'quantity': 1,
#             },
#         ],
#         mode='payment',
#         success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
#         cancel_url=settings.SITE_URL + '/?cancelled=true',
#     )
#     return session.id







# class StripeCheckoutView(APIView):
#     def post(self, request):
#         try:
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
#                         'price': 'price_1NCED4IRA1BEnbDjFSVT9FTr',
#                         'quantity': 1,
#                     },
#                 ],
#                 mode='payment',
#                 success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
#                 cancel_url=settings.SITE_URL + '/?cancelled=true',
#             )

#             return redirect(checkout_session.url)
#         except:
#             return Response(
#                 {'error': 'Something went wrong when creating stripe checkout session'}, 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )



