import LoginForm from '../../app/login/LoginForm';
import { fireEvent, render, waitFor } from '@testing-library/react';

global.fetch = jest.fn();

describe('LoginForm', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { assign: jest.fn() },
    });
    jest.clearAllMocks();
  });

  describe('when loginStep is 0', () => {
    it('renders the form elements', () => {
      const { container, getByRole } = render(<LoginForm />);

      expect(container.querySelector(`input[name="username"]`)).toBeInTheDocument();
      expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('validates username input and shows an error on empty submit', async () => {
      const { getByRole, findByText } = render(<LoginForm />);
  
      const loginButton = getByRole('button', { name: 'Login' });
      
      fireEvent.click(loginButton);
  
      const errorMessage = await findByText('Username is required');
      expect(errorMessage).toBeInTheDocument();
    });
  
    it('calls fetchSecureWord and proceeds to step 1 when username is submitted', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          data: { secureWord: 'fakesecureword' },
        }),
      });
  
      const { container, getByRole, getByText } = render(<LoginForm />);
  
      const usernameInput = container.querySelector(`input[name="username"]`) as Element;
      const loginButton = getByRole('button', { name: 'Login' });
  
      fireEvent.change(usernameInput, { target: { value: 'testUser' } });
      fireEvent.click(loginButton);
      
      await waitFor(() => {      
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('/api/secure-word?username=testUser');
        expect(getByText(/Hello, testUser!/)).toBeInTheDocument();
        expect(getByText(/Is your secure word/)).toBeInTheDocument();
        expect(getByText(/fakesecureword/)).toBeInTheDocument();
      });
    });
  });

  describe('when loginStep is 1', () => {
    it('returns to step 0 when user invalidates secure word', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          data: { secureWord: 'fakesecureword' },
        }),
      });
  
      const { container, getByRole, getByText } = render(<LoginForm />);
  
      const usernameInput = container.querySelector(`input[name="username"]`) as Element;
      const loginButton = getByRole('button', { name: 'Login' });
  
      fireEvent.change(usernameInput, { target: { value: 'testUser' } });
      fireEvent.click(loginButton);
  
      await waitFor(() => {
        expect(getByText(/Hello, testUser!/)).toBeInTheDocument();
        expect(getByText(/Is your secure word/)).toBeInTheDocument();
        expect(getByText(/fakesecureword/)).toBeInTheDocument();
      });
  
      const backButton = getByRole('button', { name: 'No, go back' });
      fireEvent.click(backButton);
  
      await waitFor(() => {
        const newUsernameInput = container.querySelector(`input[name="username"]`) as Element;
        expect(newUsernameInput).toBeInTheDocument();
      });
    });

    it('proceeds to step 2 when user confirms secure word', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          data: { secureWord: 'fakesecureword' },
        }),
      });
  
      const { container, getByRole, getByText } = render(<LoginForm />);
  
      const usernameInput = container.querySelector(`input[name="username"]`) as Element;
      const loginButton = getByRole('button', { name: 'Login' });
  
      fireEvent.change(usernameInput, { target: { value: 'testUser' } });
      fireEvent.click(loginButton);
  
      await waitFor(() => {
        expect(getByText(/Hello, testUser!/)).toBeInTheDocument();
        expect(getByText(/Is your secure word/)).toBeInTheDocument();
        expect(getByText(/fakesecureword/)).toBeInTheDocument();
      });
  
      const nextButton = getByRole('button', { name: 'Yes, next' });
      fireEvent.click(nextButton);
  
      await waitFor(() => {
        const passwordInput = container.querySelector(`input[name="password"]`) as Element;
        expect(passwordInput).toBeInTheDocument();
      });
    });
  });

  describe('when loginStep is 2', () => {
    it('validates password input and shows an error on empty submit', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: { secureWord: 'fakesecureword' },
        }),
      });
    
      const { container, getByRole, getByText, findByText } = render(<LoginForm />);
  
      const usernameInput = container.querySelector(`input[name="username"]`) as Element;
      const loginButton = getByRole('button', { name: 'Login' });
  
      fireEvent.change(usernameInput, { target: { value: 'testUser' } });
      fireEvent.click(loginButton);
  
      await waitFor(() => {
        expect(getByText(/Hello, testUser!/)).toBeInTheDocument();
        expect(getByText(/Is your secure word/)).toBeInTheDocument();
        expect(getByText(/fakesecureword/)).toBeInTheDocument();
      });
  
      const nextButton = getByRole('button', { name: 'Yes, next' });

      fireEvent.click(nextButton);
  
      const loginButton2 = getByRole('button', { name: 'Login' });

      fireEvent.click(loginButton2);
  
      const errorMessage = await findByText('Password is required');
      expect(errorMessage).toBeInTheDocument();
    });

    it('validates password input and logs in successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: { secureWord: 'fakesecureword' },
        }),
      });
  
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: { token: 'faketoken', user: 'testUser' },
        }),
      });
  
      const { container, getByRole, getByText } = render(<LoginForm />);
  
      const usernameInput = container.querySelector(`input[name="username"]`) as Element;
      const loginButton = getByRole('button', { name: 'Login' });
  
      fireEvent.change(usernameInput, { target: { value: 'testUser' } });
      fireEvent.click(loginButton);
  
      await waitFor(() => {
        expect(getByText(/Hello, testUser!/)).toBeInTheDocument();
        expect(getByText(/Is your secure word/)).toBeInTheDocument();
        expect(getByText(/fakesecureword/)).toBeInTheDocument();
      });
  
      const nextButton = getByRole('button', { name: 'Yes, next' });
      fireEvent.click(nextButton);
  
      const passwordInput = container.querySelector(`input[name="password"]`) as Element;
      const loginButton2 = getByRole('button', { name: 'Login' });
  
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton2);
  
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
        expect(window.location.assign).toHaveBeenCalledWith('/transactions');      
      });
    });
  });
});
