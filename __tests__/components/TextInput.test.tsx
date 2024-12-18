import TextInput from '../../app/components/TextInput';
import { fireEvent, render } from '@testing-library/react';

describe('TextInput', () => {
	it('renders the input field with default styles and attributes', () => {
    const { getByPlaceholderText } = render(<TextInput placeholder={'Enter a value'} />);

    const input = getByPlaceholderText('Enter a value');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border border-gray-400 px-md py-2xs text-sm md:text-base rounded-md w-full');
  });

	describe('when error is true', () => {
		it('displays an error message and applies error styles', () => {
			const { getByPlaceholderText, getByText } = render(<TextInput placeholder={'Enter a value'} error errorMessage={'Field is required'} />);
	
			const input = getByPlaceholderText('Enter a value');
			const errorMessage = getByText('Field is required');
	
			expect(input).toHaveClass('border-red-500');
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage).toHaveClass('text-red-500 mt-2xs text-sm');
		});
	});

	describe('when isPassword is true', () => {
		it('renders a password input with a toggle button', () => {
			const { getByPlaceholderText, getByTestId } = render(<TextInput isPassword placeholder={'Enter your password'} />);
	
			const input = getByPlaceholderText('Enter your password');
			const toggleButton = getByTestId('toggle-button');
	
			expect(input).toHaveAttribute('type', 'password');
			expect(toggleButton).toBeInTheDocument();
		});

		it('toggles password visibility when the toggle button is clicked', () => {
			const { getByPlaceholderText, getByTestId } = render(<TextInput isPassword placeholder={'Enter your password'} />);
	
			const input = getByPlaceholderText('Enter your password');
			const toggleButton = getByTestId('toggle-button');
	
			expect(input).toHaveAttribute('type', 'password');
	
			fireEvent.click(toggleButton);
			expect(input).toHaveAttribute('type', 'text');
	
			fireEvent.click(toggleButton);
			expect(input).toHaveAttribute('type', 'password');
		});
	});
});