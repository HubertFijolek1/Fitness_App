from rest_framework import generics, filters, permissions, mixins
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, Exercise
from .serializers import UserRegistrationSerializer, UserProfileSerializer, ExerciseSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


User = get_user_model()

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

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

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer  # Adjust fields as needed
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']

class ExerciseCreateView(generics.CreateAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExerciseListView(generics.ListAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Exercise.objects.filter(user=self.request.user).order_by('-date')

class ExerciseUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Exercise.objects.filter(user=self.request.user)

class ExerciseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Exercise.objects.filter(user=self.request.user)
