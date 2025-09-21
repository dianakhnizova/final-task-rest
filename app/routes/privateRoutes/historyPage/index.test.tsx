import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, it, vi } from 'vitest';
import HistoryPage, { type HistoryRecord } from '.';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'history.header': 'History',
        'history.table.emptyMessage': 'No history records',
        'history.table.openLink': 'Open',
        'buttons.btnVariables': 'Variables',
        'buttons.btnRestClient': 'Rest Client',
      };
      return translations[key] ?? key;
    },
  }),
}));

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

    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('No history records')).toBeInTheDocument();
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
