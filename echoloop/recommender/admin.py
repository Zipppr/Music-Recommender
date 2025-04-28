from django.contrib import admin
from .models import Profile, FavoriteArtist

# Register your models here.
admin.site.register(Profile)
admin.site.register(FavoriteArtist)
