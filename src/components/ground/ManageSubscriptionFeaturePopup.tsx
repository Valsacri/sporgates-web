'use client';

import { useForm } from 'react-hook-form';
import { Popup } from '../utils/Popup';
import { Input } from '../utils/form/Input';
import Button from '../utils/Button';
import {
	SubscriptionFeatureDto,
	SubscriptionFeatureDtoType,
} from '@/dtos/item/club.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

interface Props {
	feature?: SubscriptionFeatureDtoType;
	open: boolean;
	onClose: () => void;
	onSubmit: (data: SubscriptionFeatureDtoType) => void;
}

function ManageSubscriptionFeaturePopup({
	feature,
	open,
	onClose,
	onSubmit,
}: Props) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SubscriptionFeatureDto),
		defaultValues: {
			description: feature?.description || '',
		} as SubscriptionFeatureDtoType,
	});

	const onSubmitForm = (data: SubscriptionFeatureDtoType) => {
		onClose();
		onSubmit(data);
	};

	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open]);

	useEffect(() => {
		if (feature) {
			reset(feature);
		}
	}, [feature]);

	return (
		<Popup
			open={open}
			title='Add a feature'
			description='Fill in the details to add a new feature.'
			onClose={onClose}
			className='w-full lg:w-1/4'
		>
			<form onSubmit={handleSubmit(onSubmitForm)} className='space-y-3'>
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
						{feature ? 'Edit' : 'Add'}
					</Button>
				</div>
			</form>
		</Popup>
	);
}

export default ManageSubscriptionFeaturePopup;
