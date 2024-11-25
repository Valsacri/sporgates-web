'use client';

import Button from '@/components/utils/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AlertContext } from '@/client/contexts/alert.context';
import { CreateBusinessDto, CreateBusinessDtoType } from '@/dtos/business.dto';
import { BusinessClientService } from '@/client/services/business.client-service';
import { Input } from '../utils/form/Input';
import { Business } from '@/types/business.types';
import StaffTable from './StaffTable';

interface Props {
	business?: Business;
}

function CreateBusinessForm({ business }: Props) {
	const router = useRouter();
	const showAlert = useContext(AlertContext);

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			name: '',
			bio: '',
			username: '',
		} as CreateBusinessDtoType,
		resolver: zodResolver(CreateBusinessDto),
	});

	const onSubmit = async (data: CreateBusinessDtoType) => {
		try {
			if (business) {
				await BusinessClientService.update(business.id as string, data);
				router.refresh();
			} else {
				await BusinessClientService.create(data);
			}
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	return (
		<div className='space-y-3'>
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

			{business && (
				<div className='space-y-3'>
					<h4>Manage staff</h4>
					<StaffTable businessId={business.id} />
				</div>
			)}
		</div>
	);
}

export default CreateBusinessForm;
