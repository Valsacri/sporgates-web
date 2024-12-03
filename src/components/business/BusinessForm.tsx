'use client';

import { Business } from '@/types/business.types';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CreateBusinessDto, CreateBusinessDtoType } from '@/dtos/business.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { BusinessClientService } from '@/client/services/business.client-service';
import { AlertContext } from '@/client/contexts/alert.context';
import { Input } from '../utils/form/Input';
import Button from '../utils/Button';

interface Props {
	business?: Business;
}

function BusinessForm({ business }: Props) {
	const router = useRouter();
	const showAlert = useContext(AlertContext);

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			name: business?.name || '',
			bio: business?.bio || '',
			username: business?.username || '',
		} as CreateBusinessDtoType,
		resolver: zodResolver(CreateBusinessDto),
	});

	const onSubmit = async (data: CreateBusinessDtoType) => {
		try {
			if (business) {
				await BusinessClientService.update(business.id as string, data);
				showAlert({
					type: 'success',
					message: 'Business updated successfully',
				});
				router.refresh();
			} else {
				const created = await BusinessClientService.create(data);
				showAlert({
					type: 'success',
					message: 'Business created successfully',
				});
				router.push(`/businesses/${created.id}`);
			}
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='grid grid-cols-1 lg:grid-cols-2 gap-3'
		>
			<Input
				{...register('name')}
				label='First name'
				placeholder='Enter your first name'
			/>
			<Input
				{...register('username')}
				label='Username'
				placeholder='Enter your first name'
			/>
			<Input
				{...register('bio')}
				label='Bio'
				placeholder='Enter your bio'
				className='col-span-2'
			/>
			<div className='col-span-2'>
				<Button
					type='submit'
					color='primary'
					className='min-w-full lg:min-w-48 ml-auto'
					loading={formState.isSubmitting}
				>
					Save
				</Button>
			</div>
		</form>
	);
}

export default BusinessForm;
