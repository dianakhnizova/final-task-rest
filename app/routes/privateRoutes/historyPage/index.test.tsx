import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, it } from 'vitest';
import { historyPageMessages as messages } from '@/sources/messages/historyPage';
import HistoryPage, { type HistoryRecord } from '.';

const store = configureStore({ reducer: () => ({}) });

describe('HistoryPage', () => {
  it('renders header and empty message when no data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HistoryPage data={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(messages.header)).toBeDefined();
    expect(screen.getByText(messages.table.emptyMessage)).toBeDefined();
  });

  it('renders a list of history records sorted by timestamp descending', () => {
    const now = new Date();
    const older = new Date(now.getTime() - 1000 * 60);

    const data: HistoryRecord[] = [
      {
        latencyMs: 200,
        status: 200,
        timestamp: older,
        method: 'GET',
        requestSize: 100,
        responseSize: 500,
        error: null,
        url: '/api/test1',
        clientState: {},
      },
      {
        latencyMs: 300,
        status: 500,
        timestamp: now,
        method: 'POST',
        requestSize: 150,
        responseSize: 600,
        error: 'Server error',
        url: '/api/test2',
        clientState: {},
      },
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HistoryPage data={data} />
        </MemoryRouter>
      </Provider>
    );

    const rows = screen.getAllByRole('row');

    expect(rows[1]).toHaveTextContent('/api/test2');
    expect(rows[2]).toHaveTextContent('/api/test1');

    expect(rows[1]).toHaveTextContent('POST');
    expect(rows[1]).toHaveTextContent('Server error');
    expect(rows[2]).toHaveTextContent('GET');
    expect(rows[2]).not.toHaveTextContent('Server error');

    expect(screen.getAllByText('Open')).toHaveLength(2);
  });
});
