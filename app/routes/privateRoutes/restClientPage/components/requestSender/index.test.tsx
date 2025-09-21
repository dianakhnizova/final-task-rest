import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, it, vi } from 'vitest';
import { RequestSender } from '.';

vi.mock('react-redux', () => ({
  useSelector: vi.fn().mockImplementation(selector => {
    if (selector.name === 'selectMethod') return 'GET';
    if (selector.name === 'selectUrl') return 'test.com';
    if (selector.name === 'selectProtocol') return 'https://';
    if (selector.name === 'selectBody') return null;
    if (selector.name === 'selectHeaders') return [];
    if (selector.name === 'selectVariables') return [];
    if (selector.name === 'selectClientState')
      return { url: 'test.com', method: 'GET' };
    return null;
  }),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/services/historyService.ts', () => ({
  addHistoryForCurrentUser: vi.fn(),
}));

vi.mock('@/supabaseClient.ts', () => ({
  supabase: {},
}));

describe('RequestSender', () => {
  it('renders without crashing and shows send button', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <RequestSender />,
          action: async () => ({}),
        },
      ],
      { initialEntries: ['/'] }
    );

    render(<RouterProvider router={router} />);

    const sendButton = screen.getByText('buttons.send');
    expect(sendButton).toBeInTheDocument();
  });
});
