import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { Navigation } from '@/components/navigation';
import { buttonsConfig } from '@/components/navigation/handlers';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@/components/navigation/handlers', () => ({
  buttonsConfig: vi.fn(),
}));

vi.mock('../ui/button', () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('./Navigation.module.css', () => ({
  default: {
    btnSection: 'btnSection',
  },
}));

describe('Navigation', () => {
  const mockT = vi.fn();
  const mockNavigate = vi.fn();
  const mockButtonsConfig = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as Mock).mockReturnValue({
      t: mockT,
    });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (buttonsConfig as Mock).mockImplementation(mockButtonsConfig);
  });

  it('renders buttons from buttonsConfig', () => {
    const mockButtons = [
      { path: '/path1', label: 'Button 1' },
      { path: '/path2', label: 'Button 2' },
    ];

    mockButtonsConfig.mockReturnValue(mockButtons);

    render(<Navigation />);

    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('calls buttonsConfig with translation function and isRestClientPage prop', () => {
    mockButtonsConfig.mockReturnValue([]);

    render(<Navigation isRestClientPage={true} />);

    expect(mockButtonsConfig).toHaveBeenCalledWith(mockT, true);
  });

  it('calls buttonsConfig with translation function and undefined isRestClientPage', () => {
    mockButtonsConfig.mockReturnValue([]);

    render(<Navigation />);

    expect(mockButtonsConfig).toHaveBeenCalledWith(mockT, undefined);
  });

  it('navigates to correct path when button is clicked', async () => {
    const user = userEvent.setup();
    const mockButtons = [
      { path: '/home', label: 'Home' },
      { path: '/about', label: 'About' },
    ];

    mockButtonsConfig.mockReturnValue(mockButtons);

    render(<Navigation />);

    const homeButton = screen.getByText('Home');
    await user.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/home');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('navigates to different paths when different buttons are clicked', async () => {
    const user = userEvent.setup();
    const mockButtons = [
      { path: '/home', label: 'Home' },
      { path: '/about', label: 'About' },
    ];

    mockButtonsConfig.mockReturnValue(mockButtons);

    render(<Navigation />);

    const homeButton = screen.getByText('Home');
    const aboutButton = screen.getByText('About');

    await user.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/home');

    await user.click(aboutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/about');

    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });

  it('renders correct number of buttons', () => {
    const mockButtons = [
      { path: '/path1', label: 'Button 1' },
      { path: '/path2', label: 'Button 2' },
      { path: '/path3', label: 'Button 3' },
    ];

    mockButtonsConfig.mockReturnValue(mockButtons);

    render(<Navigation />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('handles empty buttons array', () => {
    mockButtonsConfig.mockReturnValue([]);

    render(<Navigation />);

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('matches snapshot with buttons', () => {
    const mockButtons = [
      { path: '/home', label: 'Home' },
      { path: '/about', label: 'About' },
    ];

    mockButtonsConfig.mockReturnValue(mockButtons);

    const { container } = render(<Navigation />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot without buttons', () => {
    mockButtonsConfig.mockReturnValue([]);

    const { container } = render(<Navigation />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with isRestClientPage prop', () => {
    const mockButtons = [{ path: '/home', label: 'Home' }];

    mockButtonsConfig.mockReturnValue(mockButtons);

    const { container } = render(<Navigation isRestClientPage={true} />);
    expect(container).toMatchSnapshot();
  });
});
