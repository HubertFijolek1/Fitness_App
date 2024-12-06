from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

class Exercise(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    exercise_type = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    sets = models.IntegerField(default=1)
    reps = models.IntegerField(default=0)
    date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.exercise_type} on {self.date}"
