from django.db import models
from django.conf import settings

# Create your models here.
class Listing(models.Model):
    movie_id = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.movie_id} by {self.author.username}'