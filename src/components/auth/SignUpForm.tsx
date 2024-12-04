'use client';

import { UserContext } from '@/client/contexts/user.context';
import { AuthClientService } from '@/client/services/auth.client-service';
import AuthProviders from '@/components/auth/AuthProviders';
import Button from '@/components/utils/Button';
import { Checkbox } from '@/components/utils/form/Checkbox';
import { Input } from '@/components/utils/form/Input';
import { SignUpDto } from '@/dtos/auth.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

function SignUpForm() {
	const router = useRouter();

	const [, setUser] = useContext(UserContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SignUpDto),
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			shouldRememberDevice: false,
		},
	});

	const onSubmit = async (data: any) => {
		const credentials = await createUserWithEmailAndPassword(
			getAuth(),
			data.email,
			data.password
		);
		const user = await AuthClientService.signUp(credentials, {
			firstName: data.firstName,
			lastName: data.lastName,
			username: data.username,
			email: data.email,
		});

		setUser(user);
		router.push('/');
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-3xl font-semibold'>Welcome to SporGates 👋</h1>

			<div className='space-y-3 my-7 mb-10'>
				<div className='flex flex-col lg:flex-row gap-3'>
					<Input
						{...register('firstName')}
						label='First Name'
						placeholder='Enter your first name'
						containerClassName='h-[50px]'
						inputClassName='h-[50px]'
						error={errors.firstName?.message}
					/>
					<Input
						{...register('lastName')}
						label='Last Name'
						placeholder='Enter your last name'
						containerClassName='h-[50px]'
						inputClassName='h-[50px]'
						error={errors.lastName?.message}
					/>
				</div>
				<div className='flex flex-col lg:flex-row gap-3'>
					<Input
						{...register('username')}
						label='Username'
						placeholder='Choose a username'
						containerClassName='h-[50px]'
						inputClassName='h-[50px]'
						error={errors.username?.message}
					/>
					<Input
						{...register('email')}
						label='Email'
						placeholder='Enter your email'
						containerClassName='h-[50px]'
						inputClassName='h-[50px]'
						error={errors.email?.message}
					/>
				</div>

				<div className='flex flex-col lg:flex-row gap-3'>
					<Input
						{...register('password')}
						type='password'
						label='Password'
						placeholder='Choose a password'
						containerClassName='h-[50px]'
						inputClassName='h-[50px]'
						error={errors.password?.message}
					/>
					<Input
						{...register('confirmPassword')}
						type='password'
						label='Confirm Password'
						placeholder='Confirm your password'
						containerClassName='h-[50px]'
						inputClassName='h-[50px]'
						error={errors.confirmPassword?.message}
					/>
				</div>

				<Checkbox
					{...register('shouldRememberDevice')}
					label='Remember this device'
				/>
			</div>

			<Button
				color='primary'
				className='w-full mx-auto py-6 rounded-full mb-3'
				type='submit'
			>
				Sign up
			</Button>

			<div className='space-y-3 text-center'>
				<h3>Or</h3>

				<AuthProviders />

				<div className='flex justify-between'>
					<Link
						href='/sign-in'
						className='w-full text-center text-sm underline mt-5'
					>
						Already have an account? Sign in!
					</Link>
				</div>
			</div>
		</form>
	);
}

export default SignUpForm;
