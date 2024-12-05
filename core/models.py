from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    # Add additional fields if necessary

    def __str__(self):
        return self.username
