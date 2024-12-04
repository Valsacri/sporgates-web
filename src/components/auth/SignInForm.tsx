'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { AuthClientService } from '@/client/services/auth.client-service';
import AuthProviders from '@/components/auth/AuthProviders';
import Button from '@/components/utils/Button';
import { Checkbox } from '@/components/utils/form/Checkbox';
import { Input } from '@/components/utils/form/Input';
import { SignInDto } from '@/dtos/auth.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	getAuth,
	signInWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface Props {
	compact?: boolean;
}

function SignInForm({ compact }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const showAlert = useContext(AlertContext);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(SignInDto),
		defaultValues: {
			email: '',
			password: '',
			shouldRememberDevice: false,
		},
	});

	const onSubmit = async (data: any) => {
		let credentials: UserCredential;
		try {
			credentials = await signInWithEmailAndPassword(
				getAuth(),
				data.email,
				data.password
			);
		} catch (error: any) {
			console.error(error);
			if (error.code === 'auth/invalid-credential') {
				showAlert({
					type: 'warning',
					message: 'Invalid credentials',
				});
			}
			return;
		}
		await AuthClientService.signIn(credentials);
		if (pathname === '/sign-in') {
			router.push('/');
		} else {
			router.refresh();
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-3xl font-semibold'>
				{compact ? 'Welcome 👋' : 'Welcome back 👋'}
			</h1>

			<div className={twMerge('space-y-3 mt-7 mb-10', compact && 'mt-3 mb-5')}>
				<Input
					{...register('email')}
					label='Email'
					placeholder='Enter your email'
					containerClassName={compact ? '' : 'h-[60px]'}
					inputClassName={compact ? '' : 'h-[60px]'}
					error={errors.email?.message}
				/>
				<Input
					{...register('password')}
					type='password'
					label='Password'
					placeholder='Enter your password'
					containerClassName={compact ? '' : 'h-[60px]'}
					inputClassName={compact ? '' : 'h-[60px]'}
					error={errors.password?.message}
				/>
				{!compact && (
					<div className='flex justify-between'>
						<Checkbox
							{...register('shouldRememberDevice')}
							label='Remember this device'
						/>
						<Link
							href='/auth/forgot-password'
							className='text-sm text-nowrap text-primary hover:underline'
						>
							Forgot password?
						</Link>
					</div>
				)}
			</div>

			<Button
				color='primary'
				className={twMerge(
					'w-full mx-auto mb-3',
					!compact && 'rounded-full py-6'
				)}
				type='submit'
				loading={isSubmitting}
			>
				Sign in
			</Button>

			<div className='space-y-3 text-center'>
				<h3>Or</h3>

				<AuthProviders compact={compact} />

				<div className='flex justify-between'>
					<Link
						href='/sign-up'
						className='w-full text-center text-sm underline mt-5'
					>
						Dont have an account? {compact && <br />} Sign up!
					</Link>
				</div>
			</div>
		</form>
	);
}

export default SignInForm;
