import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../components/Profile';
import api from '../api/api';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../api/api');

test('renders profile page with user data', async () => {
  const profileData = {
    user: 'testuser',
    bio: 'This is a test bio.',
    avatar: null,
  };

  api.get.mockResolvedValue({ data: profileData });

  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  const userProfile = await screen.findByText(/testuser's Profile/i);
  expect(userProfile).toBeInTheDocument();
  expect(screen.getByText('This is a test bio.')).toBeInTheDocument();
});
