'use client';

import { UserContext } from '@/client/contexts/user.context';
import { AuthClientService } from '@/client/services/auth.client-service';
import { UserClientService } from '@/client/services/user.client-service';
import AuthProviders from '@/components/auth/AuthProviders';
import Button from '@/components/utils/Button';
import { Checkbox } from '@/components/utils/form/Checkbox';
import { Input } from '@/components/utils/form/Input';
import { SignUpDto } from '@/dtos/user.dto';
import { Role } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CgPassword } from 'react-icons/cg';

function Page() {
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
		const user = await AuthClientService.signUp(
			credentials,
			data.email,
			data.firstName,
			data.lastName
		);

		setUser(user);
		router.push('/');
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1 className='text-3xl font-semibold'>Welcome to SporGates 👋</h1>

			<div className='space-y-5 my-7 mb-10'>
				<div className='flex flex-col lg:flex-row gap-5'>
					<Input
						{...register('firstName')}
						label='First Name'
						placeholder='Enter your first name'
						containerClassName='h-[60px]'
						inputClassName='h-[60px]'
						error={errors.firstName?.message}
					/>
					<Input
						{...register('lastName')}
						label='Last Name'
						placeholder='Enter your last name'
						containerClassName='h-[60px]'
						inputClassName='h-[60px]'
						error={errors.lastName?.message}
					/>
				</div>

				<Input
					{...register('email')}
					label='Email'
					placeholder='Enter your email'
					containerClassName='h-[60px]'
					inputClassName='h-[60px]'
					error={errors.email?.message}
				/>
				<div className='flex flex-col lg:flex-row gap-5'>
					<Input
						{...register('password')}
						type='password'
						label='Password'
						placeholder='Enter your password'
						containerClassName='h-[60px]'
						inputClassName='h-[60px]'
						error={errors.password?.message}
					/>
					<Input
						{...register('confirmPassword')}
						type='password'
						label='Confirm Password'
						placeholder='Confirm your password'
						containerClassName='h-[60px]'
						inputClassName='h-[60px]'
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

export default Page;
