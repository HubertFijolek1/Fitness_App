from django.urls import path
from .views import (
    UserRegistrationView,
    UserProfileDetailView,
    UserProfileUpdateView,
    UserListView,
    ExerciseCreateView,
    ExerciseListView,
    ExerciseUpdateView,
    ExerciseDetailView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('profile/', UserProfileDetailView.as_view(), name='user-profile-detail'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='user-profile-update'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('exercises/', ExerciseCreateView.as_view(), name='exercise-create'),
    path('exercises/list/', ExerciseListView.as_view(), name='exercise-list'),
    path('exercises/<int:pk>/', ExerciseUpdateView.as_view(), name='exercise-update'),
    path('exercises/<int:pk>/', ExerciseDetailView.as_view(), name='exercise-detail'),

]
