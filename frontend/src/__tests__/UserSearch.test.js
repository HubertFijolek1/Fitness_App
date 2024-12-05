import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSearch from '../components/UserSearch';
import api from '../api/api';

jest.mock('../api/api');

test('searches and displays user results', async () => {
  const users = [
    { id: 1, username: 'testuser1', email: 'test1@example.com' },
    { id: 2, username: 'testuser2', email: 'test2@example.com' },
  ];

  api.get.mockResolvedValue({ data: users });

  render(<UserSearch />);

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'test' } });

  const button = screen.getByText('Search');
  fireEvent.click(button);

  const resultItems = await screen.findAllByRole('listitem');
  expect(resultItems).toHaveLength(2);
  expect(screen.getByText(/testuser1/)).toBeInTheDocument();
  expect(screen.getByText(/testuser2/)).toBeInTheDocument();
});
