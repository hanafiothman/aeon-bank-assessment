import { getTransactions } from '../../app/transactions/actions';
import { GetTransactionsResponse, Transaction } from '../../app/api/transactions/route';

global.fetch = jest.fn();

describe('transactions module actions functions', () => {
	beforeEach(() => {
    jest.clearAllMocks();
  });

	describe('getTransactions', () => {
    const mockTransactionsData: Transaction[] = [
			{
				createdAt: new Date('2023-07-12'),
				refId: '#18726272098',
				recipient: 'Bloom Enterprise Sdn Bhd',
				type: 'Bank Transfer',
				amount: 1200
			},
			{
				createdAt: new Date('2023-07-14'),
				refId: '#61552876534',
				recipient: 'Muhammad Andy Asmawi',
				type: 'DuitNow',
				amount: 54810.16
			},
			{
				createdAt: new Date('2023-08-24'),
				refId: '#39897653546',
				recipient: 'Utilities Company Sdn Bhd',
				type: 'JomPAY',
				amount: 100
			},
		];

    it('should return list of transactions users on successful call', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
				json: async (): Promise<GetTransactionsResponse> => ({
					success: true,
					message: 'Get transactions successful',
          data: mockTransactionsData
        }),
      });

      const result = await getTransactions();
      expect(result).toEqual(mockTransactionsData);
    });

    it('should return empty array if the response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
				json: async () => undefined,
      });
      const result = await getTransactions();
      expect(result).toEqual([]);
    });

    it('should throw an Error on exception', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

      try {
        await getTransactions();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        expect(e.message).toBe('API error');
      }
    });
  });
});