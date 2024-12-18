import { render } from '@testing-library/react';
import AnalyticsPage from '../../app/analytics/page';

describe('AnalyticsPage', () => {
	it('renders the AnalyticsPage with correct text and styling', () => {
		const { getByText } = render(<AnalyticsPage />);
		
		const title = getByText('Analytics');
		expect(title).toBeInTheDocument();
		
		expect(title).toHaveClass('font-bold');
		expect(title).toHaveClass('text-xl');
		expect(title).toHaveClass('mb-lg');
	});
});