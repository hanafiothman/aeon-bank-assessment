import { GetTransactionsResponse, Transaction } from '../api/transactions/route';

export async function getTransactions(): Promise<Transaction[]> {
	try {
		const response = await fetch(`${process.env.APP_URL}/api/transactions`, {
			headers: {
				Accept: 'application/json'
			},
			next: {
				tags: ['transactions']
			}
		});

		if (!response.ok) {
			return [];
		}

		const resJson: GetTransactionsResponse = await response.json();		
		return resJson.data;

	} catch (e) {
		throw e;
	}
}