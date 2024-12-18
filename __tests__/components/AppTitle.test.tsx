import { render } from '@testing-library/react';
import AppTitle from '../../app/components/AppTitle';

jest.mock('../../app/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

const useAuthMock = jest.requireMock('../../app/providers/AuthProvider').useAuth;

describe('AppTitle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders link to "/" when user is not logged in', () => {
    useAuthMock.mockReturnValue({ isLoggedIn: false });

    const { getByRole } = render(<AppTitle />);
    const linkElement = getByRole('link', { name: /ÆON/i });

    expect(linkElement).toHaveAttribute('href', '/');
  });

  it('renders link to "/transactions" when user is logged in', () => {
    useAuthMock.mockReturnValue({ isLoggedIn: true });

    const { getByRole } = render(<AppTitle />);
    const linkElement = getByRole('link', { name: /ÆON/i });

    expect(linkElement).toHaveAttribute('href', '/transactions');
  });
});