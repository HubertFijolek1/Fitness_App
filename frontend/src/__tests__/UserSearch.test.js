import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSearch from '../components/UserSearch';
import api from '../api/api';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../api/api');

test('searches and displays user results', async () => {
  const users = [
    { id: 1, username: 'testuser1', email: 'test1@example.com' },
    { id: 2, username: 'testuser2', email: 'test2@example.com' },
  ];

  api.get.mockResolvedValue({ data: users });

  render(
    <BrowserRouter>
      <UserSearch />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText('Enter username or email');
  fireEvent.change(input, { target: { value: 'test' } });

  const button = screen.getByText('Search');
  fireEvent.click(button);

  const resultItems = await screen.findAllByRole('listitem');
  expect(resultItems).toHaveLength(2);
  expect(screen.getByText(/testuser1/)).toBeInTheDocument();
  expect(screen.getByText(/testuser2/)).toBeInTheDocument();
});
