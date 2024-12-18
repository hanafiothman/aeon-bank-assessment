import { render } from '@testing-library/react';
import DocsPage from '../../app/docs/page';

describe('DocsPage', () => {
  it('renders the DocsPage with correct text and styling', () => {
    const { getByText } = render(<DocsPage />);
    
    const title = getByText('Docs');
    expect(title).toBeInTheDocument();
    
    expect(title).toHaveClass('font-bold');
    expect(title).toHaveClass('text-xl');
    expect(title).toHaveClass('mb-lg');
  });
});