import { store } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Response } from '.';

describe('Response component', () => {
  it('renders without crashing and displays formatted data', () => {
    const testData = { message: 'Hello World' };

    render(
      <Provider store={store}>
        <Response data={testData} status={200} />
      </Provider>
    );

    expect(screen.getByText(/200/)).toBeInTheDocument();

    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });

  it('renders correctly with empty data and no status', () => {
    render(
      <Provider store={store}>
        <Response data={null} status={null} />
      </Provider>
    );

    expect(screen.getByText(/Status/i).nextSibling?.textContent).toBe('');

    expect(screen.getByText(/Body/i)).toBeInTheDocument();
  });
});
