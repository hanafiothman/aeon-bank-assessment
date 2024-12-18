import { render } from '@testing-library/react';
import ShowcasePage from '../../app/showcase/page';

describe('ShowcasePage', () => {
	it('renders the ShowcasePage with correct text and styling', () => {
		const { getByText } = render(<ShowcasePage />);
		
		const title = getByText('Showcase');
		expect(title).toBeInTheDocument();
		
		expect(title).toHaveClass('font-bold');
		expect(title).toHaveClass('text-xl');
		expect(title).toHaveClass('mb-lg');
	});
});