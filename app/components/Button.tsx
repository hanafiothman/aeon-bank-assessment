import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button({ children, className, disabled, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
	const baseClasses = 'bg-primary rounded-md text-white px-md py-2xs text-sm md:text-base disabled:opacity-50';

	return (
		<button
			className={twMerge(baseClasses, className)}
			disabled={disabled}
			{...rest}
		>
			{ children }
		</button>
	);
}
