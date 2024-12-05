from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    # Add additional fields if necessary

    def __str__(self):
        return self.username

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"