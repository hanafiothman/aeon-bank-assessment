import { render, fireEvent } from '@testing-library/react';
import Navbar from '../../app/components/Navbar';

jest.mock('../../app/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const useAuthMock = jest.requireMock('../../app/providers/AuthProvider').useAuth;
const usePathnameMock = jest.requireMock('next/navigation').usePathname;

describe('Navbar', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'location', {
      value: { assign: jest.fn() },
    });
    jest.clearAllMocks();
  });

	it('renders AppTitle and login link for logged-out users', () => {
    useAuthMock.mockReturnValue({ isLoggedIn: false });
    usePathnameMock.mockReturnValue('/');

    const { getAllByRole, getByRole } = render(<Navbar />);

		const logoLinks = getAllByRole('link', { name: 'ÆON' });
    expect(logoLinks[0]).toBeInTheDocument();
    expect(getByRole('link', { name: 'Login' })).toBeInTheDocument();
  });

	it('renders AppTitle and logout button for logged-in users', () => {
    useAuthMock.mockReturnValue({ isLoggedIn: true });
    usePathnameMock.mockReturnValue('/');

    const { getAllByRole, getByRole } = render(<Navbar />);

		const logoLinks = getAllByRole('link', { name: 'ÆON' });
    expect(logoLinks[0]).toBeInTheDocument();
    expect(getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('renders navbar links correctly', () => {
    useAuthMock.mockReturnValue({ isLoggedIn: false });
    usePathnameMock.mockReturnValue('/');

    const { getAllByRole } = render(<Navbar />);

    const links = ['Showcase', 'Docs', 'Blog', 'Analytics', 'Templates', 'Enterprise'];
    links.forEach((link) => {
			const nodes = getAllByRole('link', { name: link });
			expect(nodes[0]).toBeInTheDocument();
		});
  });

	it('displays mobile menu when menu button is clicked', () => {
    useAuthMock.mockReturnValue({ isLoggedIn: false });
    usePathnameMock.mockReturnValue('/');

    const { getByTestId } = render(<Navbar />);

    const menuButton = getByTestId('menu-button');
    fireEvent.click(menuButton);

    expect(getByTestId('mobile-menu')).toHaveClass('translate-x-0');
  });

	it('hides mobile menu when close button is clicked', () => {
    useAuthMock.mockReturnValue({ isLoggedIn: false });
    usePathnameMock.mockReturnValue('/');

    const { getByTestId } = render(<Navbar />);

    const menuButton = getByTestId('menu-button');
    fireEvent.click(menuButton);

    const closeMenuButton = getByTestId('close-menu-button');
    fireEvent.click(closeMenuButton);

    expect(getByTestId('mobile-menu')).toHaveClass('-translate-x-full');
		expect(getByTestId('mobile-menu')).not.toHaveClass('translate-x-0');
  });

  it('renders NavbarSearch when search button is clicked', () => {
    useAuthMock.mockReturnValue({ isLoggedIn: false });
    usePathnameMock.mockReturnValue('/');

    const { getByTestId, getAllByPlaceholderText } = render(<Navbar />);

    const searchButton = getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(getAllByPlaceholderText('Search documentation...')[1]).toBeInTheDocument();
  });

	describe('when click on logout', () => {
		it('clears localStorage and redirects to /login', () => {
			useAuthMock.mockReturnValue({ isLoggedIn: true });
			usePathnameMock.mockReturnValue('/');
	
			const mockClear = jest.spyOn(Storage.prototype, 'clear');
	
			const { getByRole } = render(<Navbar />);
			const logoutButton = getByRole('button', { name: 'Logout' });
			fireEvent.click(logoutButton);
	
			expect(mockClear).toHaveBeenCalled();
			expect(window.location.assign).toHaveBeenCalledWith('/login');      
		});
	});

});