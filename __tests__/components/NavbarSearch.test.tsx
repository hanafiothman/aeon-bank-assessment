import { render, fireEvent } from '@testing-library/react';
import NavbarSearch from '../../app/components/NavbarSearch';

describe('NavbarSearch', () => {
  it('renders the search input with placeholder text', () => {
    const { getByPlaceholderText } = render(<NavbarSearch />);

    const input = getByPlaceholderText('Search documentation...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('has the correct class name applied for styling', () => {
    const { getByPlaceholderText } = render(<NavbarSearch />);

    const input = getByPlaceholderText('Search documentation...');
    expect(input).toHaveClass('bg-gray-200 px-md py-2xs w-full text-sm md:text-base rounded-md');
  });

  it('updates the input value on change', () => {
    const { getByPlaceholderText } = render(<NavbarSearch />);

    const input = getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'Lorem ipsum dolor sit amet' } });

    expect(input).toHaveValue('Lorem ipsum dolor sit amet');
  });
});
