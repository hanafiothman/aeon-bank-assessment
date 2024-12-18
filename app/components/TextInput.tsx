import { HTMLAttributes, InputHTMLAttributes, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	errorMessage?: string;
	containerProps?: HTMLAttributes<HTMLDivElement>;
	isPassword?: boolean;
}

export default function TextInput({ error, errorMessage, className, containerProps, isPassword, type, ...rest }: TextInputProps) {
	const [isShowPassword, setShowPassword] = useState<boolean>(false);

	const baseClasses = `border ${error ? 'border-red-500' : 'border-gray-400'} px-md py-2xs text-sm md:text-base rounded-md w-full`;

	return (
		<div
			{...containerProps}
			className={twMerge('relative', containerProps?.className)}
		>
			<input
				className={twMerge(baseClasses, className)}
				type={isPassword ? isShowPassword ? 'text' : 'password' : type}
				{...rest}
			/>
			{ error && errorMessage ?
			<div className="text-red-500 mt-2xs text-sm">
				{errorMessage}
			</div>
			: null }
			
			{ isPassword ?
			<button
				data-testid="toggle-button"
				type="button"
				className="absolute right-md top-sm"
				onClick={() => setShowPassword(!isShowPassword)}
			>
				{isShowPassword ? <BsEye /> : <BsEyeSlash />}
			</button>
			: null }
		</div>
	);
}
