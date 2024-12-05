import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from django.urls import reverse

User = get_user_model()

@pytest.mark.django_db
def test_register_user():
    client = APIClient()
    url = reverse('user-registration')
    data = {
        'username': 'testuser',
        'email': 'testuser@example.com',
        'password': 'testpassword123',
    }
    response = client.post(url, data)
    assert response.status_code == 201
    assert User.objects.count() == 1
    user = User.objects.first()
    assert user.username == 'testuser'
    assert user.email == 'testuser@example.com'

@pytest.mark.django_db
def test_login_user():
    user = User.objects.create_user(username='testuser', password='testpassword123')
    client = APIClient()
    url = reverse('token_obtain_pair')
    data = {
        'username': 'testuser',
        'password': 'testpassword123',
    }
    response = client.post(url, data)
    assert response.status_code == 200
    assert 'access' in response.data
    assert 'refresh' in response.data
