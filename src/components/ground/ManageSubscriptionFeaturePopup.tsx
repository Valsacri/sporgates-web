'use client';

import { useForm } from 'react-hook-form';
import { Popup } from '../utils/Popup';
import { Input } from '../utils/form/Input';
import Button from '../utils/Button';
import { SubscriptionFeatureDto } from '@/dtos/item/club.dto';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
	open: boolean;
	onClose: () => void;
}

function ManageSubscriptionFeaturePopup({ open, onClose }: Props) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SubscriptionFeatureDto),
		defaultValues: {
			description: '',
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
		reset();
		onClose();
	};

	return (
		<Popup
			open={open}
			title='Add a feature'
			description='Fill in the details to add a new feature.'
			onClose={onClose}
			className='w-full lg:w-1/4'
		>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
				<div className='space-y-3'>
					<Input
						{...register('description')}
						placeholder='Description'
						rows={5}
						error={errors.description?.message}
					/>
				</div>

				<div className='flex justify-end gap-3'>
					<Button color='secondary' onClick={onClose}>
						Close
					</Button>
					<Button type='submit' color='primary'>
						Add
					</Button>
				</div>
			</form>
		</Popup>
	);
}

export default ManageSubscriptionFeaturePopup;
