from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

class FavoriteArtist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.artist_name} (Favorite of {self.user.username})"
