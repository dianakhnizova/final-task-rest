import { store } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { UrlBox } from '..';

describe('UrlBox', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <UrlBox />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/url/i);
    expect(input).toBeInTheDocument();
  });
});
