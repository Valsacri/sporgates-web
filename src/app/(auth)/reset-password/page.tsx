'use client';

import { AuthClientService } from '@/client/services/auth.client-service';
import Button from '@/components/utils/Button';
import { Input } from '@/components/utils/form/Input';
import { EmailDto } from '@/dtos/auth.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

function Page() {
	const { register, handleSubmit, formState } = useForm({
		resolver: zodResolver(EmailDto),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async ({ email }: any) => {
		await AuthClientService.sendPasswordResetEmail(email);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
			<h1 className='text-3xl font-semibold'>Send a reset code</h1>

			<Input
				{...register('email')}
				label='Email'
				placeholder='Enter your email'
				containerClassName='h-[60px]'
				inputClassName='h-[60px]'
				error={formState.errors.email?.message}
			/>

			<Button
				color='primary'
				type='submit'
				className='w-full mx-auto py-6 rounded-full mb-3'
				loading={formState.isSubmitting}
			>
				Send code
			</Button>
		</form>
	);
}

export default Page;
