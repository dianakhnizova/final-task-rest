import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Theme } from '@/sources/enums';
import { ThemeContext, ThemeProvider } from './ThemeContext';

const Consumer = () => (
  <ThemeContext.Consumer>
    {value =>
      value ? (
        <button onClick={value.toggleTheme}>{value.theme}</button>
      ) : (
        <span>No theme</span>
      )
    }
  </ThemeContext.Consumer>
);

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('provides default theme DARK', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(Theme.DARK);
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      Theme.DARK
    );
  });

  it('toggles theme between DARK and LIGHT', async () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(Theme.DARK);

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent(Theme.LIGHT);
      expect(document.documentElement.getAttribute('data-theme')).toBe(
        Theme.LIGHT
      );
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent(Theme.DARK);
      expect(document.documentElement.getAttribute('data-theme')).toBe(
        Theme.DARK
      );
    });
  });
});
