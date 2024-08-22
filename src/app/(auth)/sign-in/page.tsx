'use client';

import AuthProviders from '@/components/auth/AuthProviders';
import Button from '@/components/utils/Button';
import { Checkbox } from '@/components/utils/form/Checkbox';
import { Input } from '@/components/utils/form/Input';
import { SignInDto } from '@/dtos/user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

function Page() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SignInDto),
		defaultValues: {
			email: '',
			password: '',
			shouldRememberDevice: false,
		},
	});
	const onSubmit = async (data: any) => {
		await signInWithEmailAndPassword(getAuth(), data.email, data.password);
		router.push('/');
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-3xl font-semibold'>Welcome back 👋</h1>

			<div className='space-y-5 my-7 mb-10'>
				<Input
					{...register('email')}
					label='Email'
					placeholder='Enter your email'
					containerClassName='h-[60px]'
					inputClassName='h-[60px]'
					error={errors.email?.message}
				/>
				<Input
					{...register('password')}
					type='password'
					label='Password'
					placeholder='Enter your password'
					containerClassName='h-[60px]'
					inputClassName='h-[60px]'
					error={errors.password?.message}
				/>
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
			</div>

			<Button
				color='primary'
				className='w-full mx-auto py-6 rounded-full mb-3'
				type='submit'
			>
				Sign in
			</Button>

			<div className='space-y-3 text-center'>
				<h3>Or</h3>

				<AuthProviders />

				<div className='flex justify-between'>
					<Link
						href='/sign-up'
						className='w-full text-center text-sm underline mt-5'
					>
						Dont have an account? Sign up!
					</Link>
				</div>
			</div>
		</form>
	);
}

export default Page;
