'use client';

import Link from 'next/link';
import { useAuth } from '../providers/AuthProvider';

export default function AppTitle() {
	const { isLoggedIn } = useAuth();

	return (
		<div className="w-max whitespace-nowrap">
			<Link href={isLoggedIn ? '/transactions' : '/'} className="font-bold text-xl text-primary">ÆON</Link>
		</div>
  );
}
