import Button from '../../app/components/Button';
import { render } from '@testing-library/react';

describe('Button', () => {
  it('renders the Button with correct text and styling', () => {
    const { getByRole } = render(<Button>Click me</Button>);

    const clickMeButton = getByRole('button', { name: 'Click me' });
    expect(clickMeButton).toBeInTheDocument();

    expect(clickMeButton).toHaveClass('bg-primary rounded-md text-white px-md py-2xs text-sm md:text-base disabled:opacity-50');
  });
});