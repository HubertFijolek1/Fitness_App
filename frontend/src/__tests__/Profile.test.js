import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../components/Profile';
import api from '../api/api';

jest.mock('../api/api');

test('renders profile page', async () => {
  const profileData = {
    user: 'testuser',
    bio: 'Test bio',
    avatar: null,
  };

  api.get.mockResolvedValue({ data: profileData });

  render(<Profile />);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  const userProfile = await screen.findByText(/testuser's Profile/i);
  expect(userProfile).toBeInTheDocument();
  expect(screen.getByText('Test bio')).toBeInTheDocument();
});