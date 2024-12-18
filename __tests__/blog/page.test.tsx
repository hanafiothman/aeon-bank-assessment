import { render } from '@testing-library/react';
import BlogPage from '../../app/blog/page';

describe('BlogPage', () => {
  it('renders the BlogPage with correct text and styling', () => {
    const { getByText } = render(<BlogPage />);
    
    const title = getByText('Blog');
    expect(title).toBeInTheDocument();
    
    expect(title).toHaveClass('font-bold');
    expect(title).toHaveClass('text-xl');
    expect(title).toHaveClass('mb-lg');
  });
});