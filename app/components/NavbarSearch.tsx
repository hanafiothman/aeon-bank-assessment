'use client';

import { ChangeEvent, useState } from 'react';

export default function NavbarSearch() {
	const [keyword, setKeyword] = useState<string>('');

	return (
		<input
			value={keyword}
			onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
			placeholder={'Search documentation...'}
			className="bg-gray-200 px-md py-2xs w-full text-sm md:text-base rounded-md"
		/>
  );
}
