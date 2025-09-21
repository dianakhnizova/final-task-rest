import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, it } from 'vitest';
import { historyPageMessages as messages } from '@/sources/messages/historyPage';
import HistoryPage from '.';

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
});
