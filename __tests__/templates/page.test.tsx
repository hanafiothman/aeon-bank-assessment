import { render } from '@testing-library/react';
import TemplatesPage from '../../app/templates/page';

describe('TemplatesPage', () => {
	it('renders the TemplatesPage with correct text and styling', () => {
		const { getByText } = render(<TemplatesPage />);
		
		const title = getByText('Templates');
		expect(title).toBeInTheDocument();
		
		expect(title).toHaveClass('font-bold');
		expect(title).toHaveClass('text-xl');
		expect(title).toHaveClass('mb-lg');
	});
});