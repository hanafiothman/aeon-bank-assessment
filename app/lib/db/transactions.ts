import { Transaction } from '../../api/transactions/route';

const transactions: Transaction[] = [
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
  
export default transactions;