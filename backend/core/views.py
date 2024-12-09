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
        qs = Exercise.objects.filter(user=self.request.user)
        # If we had a query param like ?range=week, filter last 7 days:
        date_range = self.request.query_params.get('range')
        if date_range == 'week':
            from django.utils.timezone import now, timedelta
            start_date = now().date() - timedelta(days=7)
            qs = qs.filter(date__gte=start_date)
        if date_range == 'month':
            from django.utils.timezone import now, timedelta
            start_date = now().date().replace(day=1)  # beginning of current month
            qs = qs.filter(date__gte=start_date)
        return qs.order_by('-date')


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
