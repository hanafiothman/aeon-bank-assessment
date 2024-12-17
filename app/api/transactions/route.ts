import transactions from '../../lib/db/transactions';

type TransactionType = 'DuitNow' | 'JomPAY' | 'FPX' | 'E-Wallet' | 'MEPS' | 'Bank Transfer';

export interface Transaction {
	createdAt: Date;
	refId: string;
	recipient: string;
	type: TransactionType;
	amount: number;
}

export interface GetTransactionsResponse {
	success: boolean;
	message: string;
	data: Transaction[];
};

export async function GET(): Promise<Response> {
  try {
		const transactionsSort = transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Get transactions successful',
				data: transactionsSort
			} as GetTransactionsResponse),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);

	} catch (error) {
		throw error;
	}
}