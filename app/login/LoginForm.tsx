'use client';

import { useFormik } from 'formik';
import { FormEvent, useState } from 'react';
import { object, string } from 'yup';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { GetSecureWordResponse } from '../api/secure-word/route';
import { LoginResponse } from '../api/login/route';
import bcrypt from 'bcryptjs';

interface LoginInput {
	username: string;
	password: string;
}

export default function LoginForm() {
	const [loginStep, setLoginStep] = useState<number>(0);
	const [secureWord, setSecureWord] = useState<string>('');

	const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      username: '',
			password: ''
    },
    onSubmit: async (values: LoginInput) => {
			if (loginStep === 0) {
				fetchSecureWord(values.username);
			} else if (loginStep === 2) {
				login(values.username, values.password);
			}
    },
    validationSchema: loginStep === 2 ? 
			object({
      	username: string().required('Username is required'),
				password: string().required('Password is required')
    	})
			:
			object({
      	username: string().required('Username is required'),
    	})
  });

	const fetchSecureWord = async (username: string) => {
		const response = await fetch(`/api/secure-word?username=${username}`);

		if (!response.ok) {
			alert('Something went wrong');
		}

		const resJson: GetSecureWordResponse = await response.json();
		setSecureWord(resJson.data.secureWord);
		setLoginStep(loginStep + 1);
	}

	const login = async (username: string, password: string) => {
		const cryptedPassword = bcrypt.hashSync(password, 10);

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: cryptedPassword
			})
		});

		if (!response.ok) {
			alert('Something went wrong');
		}

		const resJson: LoginResponse = await response.json();
		localStorage.setItem('user', JSON.stringify(resJson.data));
		window.location.href = '/';
	}

	const submitForm = (e: FormEvent) => {
    e.preventDefault();
		handleSubmit();
  };

	return (
		loginStep === 1 ?
		<>
			<div className="text-xl mb-lg">
				Hello, {values.username}! <br/>
				Is your secure word <b>{secureWord}</b>?
			</div>
			<div className="flex items-center">
				<Button
					onClick={() => setLoginStep(loginStep + 1)}
				>
					Yes, next
				</Button>
				<Button
					className="ml-lg border border-primary bg-white text-primary"
					onClick={() => setLoginStep(loginStep - 1)}
				>
					No, go back
				</Button>
			</div>
		</>
		:
		<form className="flex flex-col sm:flex-row items-start w-full sm:w-[500px]" onSubmit={submitForm}>
			{ loginStep === 2 ?
			<TextInput
				value={values.password}
				name={'password'}
				placeholder={'Enter your password'}
				onChange={handleChange}
				error={Boolean(errors.password)}
				errorMessage={errors.password}
				containerProps={{
					className: 'w-full'
				}}
				isPassword
			/>
			:
			<TextInput
				value={values.username}
				name={'username'}
				placeholder={'Username'}
				onChange={handleChange}
				error={Boolean(errors.username)}
				errorMessage={errors.username}
				containerProps={{
					className: 'w-full'
				}}
			/>
			}
			<Button
				type={'submit'}
				disabled={Boolean(errors.username)}
				className="w-full mt-sm sm:w-auto sm:mt-0 sm:ml-lg"
			>
				Login
			</Button>
			{ loginStep === 2 ?
			<Button
				type="button"
				className="w-full mt-sm sm:w-auto sm:mt-0 sm:ml-lg border border-primary bg-white text-primary"
				onClick={() => {
					resetForm();
					setLoginStep(0);
				}}
			>
				Cancel
			</Button>
			: null }
		</form>
	);
}
  