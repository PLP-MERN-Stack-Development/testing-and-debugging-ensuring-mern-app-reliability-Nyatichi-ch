import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BugList from '../components/BugList';
import * as api from '../services/api';

jest.mock('../services/api');

test('renders empty list message when no bugs', async () => {
  api.fetchIssues.mockResolvedValue({ data: [] });  // or adjust shape based on your API wrapper
  render(<BugList />);
  await waitFor(() => expect(api.fetchIssues).toHaveBeenCalled());
  expect(screen.getByText(/No bugs found/i)).toBeInTheDocument();
});

test('renders list of bugs when API returns data', async () => {
  const bugs = [
    { _id: '1', title: 'Bug 1', description: 'Desc 1', status: 'open' },
    { _id: '2', title: 'Bug 2', description: 'Desc 2', status: 'in_progress' },
  ];
  api.fetchIssues.mockResolvedValue({ data: bugs });

  render(<BugList />);

  await waitFor(() => expect(api.fetchIssues).toHaveBeenCalled());

  expect(screen.getByText('Bug 1')).toBeInTheDocument();
  expect(screen.getByText('Bug 2')).toBeInTheDocument();
  // maybe also check statuses, etc.
});
