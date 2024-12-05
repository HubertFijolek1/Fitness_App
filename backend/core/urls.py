from django.urls import path
from .views import (
    UserRegistrationView,
    UserProfileDetailView,
    UserProfileUpdateView,
    UserListView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('profile/', UserProfileDetailView.as_view(), name='user-profile-detail'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='user-profile-update'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
