import { getTransactions } from './actions';
import { format } from 'date-fns';

export default async function TransactionsPage() {

	const transactions = await getTransactions();

	const tableColumns = ['Date', 'Reference ID', 'To', 'Transaction Type', 'Amount'];

	return (
		<>
			<div className="font-bold text-xl mb-lg">
				List of transactions
			</div>
			<div className="max-w-full overflow-auto">
				<table className="w-full border-collapse transaction-table">
					<thead>
						<tr>
							{ tableColumns.map((col, idx) => (
								<th
									key={idx}
									className="bg-gray-200 px-xl py-sm text-left"
								>
									{col}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{ transactions.map((transaction, idx) => (
							<tr key={idx} className="border-b border-gray-200">
								<td className="px-xl py-sm">
									{format(transaction.createdAt, 'dd MMM yyyy')}
								</td>
								<td className="px-xl py-sm">
									{transaction.refId}
								</td>
								<td className="px-xl py-sm">
									{transaction.recipient}
									<div className="text-sm text-gray-400">Recipient references will go here</div>
								</td>
								<td className="px-xl py-sm">
									{transaction.type}
								</td>
								<td className="px-xl py-sm">
									RM {transaction.amount}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
  