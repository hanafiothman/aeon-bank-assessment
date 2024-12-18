import { render } from '@testing-library/react';
import EnterprisePage from '../../app/enterprise/page';

describe('EnterprisePage', () => {
	it('renders the EnterprisePage with correct text and styling', () => {
		const { getByText } = render(<EnterprisePage />);
		
		const title = getByText('Enterprise');
		expect(title).toBeInTheDocument();
		
		expect(title).toHaveClass('font-bold');
		expect(title).toHaveClass('text-xl');
		expect(title).toHaveClass('mb-lg');
	});
});