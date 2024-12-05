from rest_framework import generics
from .serializers import UserRegistrationSerializer, UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

class ProtectedView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

class UserProfileDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile

class UserProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile