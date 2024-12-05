import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from django.urls import reverse
from core.models import UserProfile

User = get_user_model()

@pytest.mark.django_db
def test_user_profile_detail():
    user = User.objects.create_user(username='testuser', password='testpassword123')
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('user-profile-detail')
    response = client.get(url)
    assert response.status_code == 200
    assert response.data['user'] == 'testuser'
    assert response.data['bio'] == ''

@pytest.mark.django_db
def test_user_profile_update():
    user = User.objects.create_user(username='testuser', password='testpassword123')
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('user-profile-update')
    data = {'bio': 'This is a test bio.'}
    response = client.put(url, data)
    assert response.status_code == 200
    profile = UserProfile.objects.get(user=user)
    assert profile.bio == 'This is a test bio.'
