'use client';

import { useForm } from 'react-hook-form';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	SubscriptionDto,
	SubscriptionDtoType,
	SubscriptionFeatureDtoType,
} from '@/dtos/item/club.dto';
import { ClubSubscriptionPeriodDuration } from '@/types/item/club.types';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { useEffect, useState } from 'react';
import { Input } from '@/components/utils/form/Input';
import { Select } from '@/components/utils/form/Select';
import Button from '@/components/utils/Button';
import { Table } from '@/components/utils/table/Table';
import { DatePicker } from '@/components/utils/form/DatePicker';
import { Checkbox } from '@/components/utils/form/Checkbox';
import ConfirmationPopup from '@/components/shared/ConfirmationPopup';
import ClubSubscriptionFeatureFormPopup from './feature/ClubSubscriptionFeatureFormPopup';

interface Props {
	subscription?: SubscriptionDtoType;
	onClose: () => void;
	onSubmit: (data: SubscriptionDtoType) => void;
}

function ClubSubscriptionForm({ subscription, onClose, onSubmit }: Props) {
	const [openFeaturePopup, toggleFeaturePopup] = usePopup();
	const [
		openFeatureRemoveConfirmationPopup,
		,
		setOpenFeatureRemoveConfirmationPopup,
	] = usePopup();

	const {
		handleSubmit,
		setValue,
		watch,
		register,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SubscriptionDto),
		defaultValues: {
			name: '',
			description: '',
			features: [],
			price: 0,
			period: {
				duration: ClubSubscriptionPeriodDuration.MONTH,
				amount: 1,
			},
			discount: {
				amount: 0,
				endDate: '',
			},
			isHighlighted: false,
		} as SubscriptionDtoType,
	});

	console.log('errors', errors);

	const features = watch('features');

	const [currentFeatureIndex, setCurrentFeatureIndex] = useState(-1);
	const currentFeature = features[currentFeatureIndex];

	const onSubmitForm = (data: SubscriptionDtoType) => {
		onClose();
		onSubmit(data);
	};

	useEffect(() => {
		if (subscription) {
			reset(subscription);
		}
	}, [subscription]);

	const priceDurations = [
		{ value: 'oneTime', label: 'One time' },
		{ value: 'hour', label: 'Hour' },
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' },
		{ value: 'year', label: 'Year' },
	];

	const discountEndDate = watch('discount.endDate');

	const hangleDatePickerChange = (date: string) => {
		setValue('discount.endDate', date);
	};

	const handleSubmitFeature = (feature: SubscriptionFeatureDtoType) => {
		if (currentFeatureIndex === -1) {
			setValue('features', [...features, feature]);
		} else {
			features.splice(currentFeatureIndex, 1, feature);
			setValue('features', features);
		}
	};

	const handleAddFeature = () => {
		setCurrentFeatureIndex(-1);
		toggleFeaturePopup();
	};

	const handleEditFeature = (index: number) => {
		setCurrentFeatureIndex(index);
		toggleFeaturePopup();
	};

	const handleRemoveSubscription = () => {
		features?.splice(currentFeatureIndex, 1);
		setValue('features', features);
	};

	const handleConfirmRemoveFeature = (index: number) => {
		setCurrentFeatureIndex(index);
		setOpenFeatureRemoveConfirmationPopup(true);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmitForm)} className='space-y-3'>
				<div className='space-y-3'>
					<h3>Infos</h3>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
						<Input
							{...register('name')}
							label='Name'
							error={errors.name?.message}
						/>
						<Input
							{...register('description')}
							label='Description'
							multiline
							error={errors.description?.message}
						/>
					</div>
				</div>

				<div className='space-y-3'>
					<h3>Price</h3>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
						<Input
							{...register('price')}
							label='Price'
							type='number'
							error={errors.price?.message}
						/>
						<Select
							{...register('period.duration')}
							value={watch('period.duration')}
							onChange={(value) =>
								setValue(
									'period.duration',
									value as ClubSubscriptionPeriodDuration
								)
							}
							options={priceDurations}
							label='Duration'
							error={errors.period?.duration?.message}
						/>
						<Input
							{...register('period.amount')}
							label='Amount (in duration)'
							type='number'
							error={errors.period?.amount?.message}
						/>
					</div>
				</div>

				<div className='space-y-3'>
					<h3>Discount</h3>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
						<Input
							{...register('discount.amount')}
							label='Amount %'
							type='number'
							error={errors.discount?.amount?.message}
						/>
						<DatePicker
							{...register('discount.endDate')}
							label='End date'
							placeholder='Select a date'
							onChange={hangleDatePickerChange}
							value={discountEndDate}
							error={errors.discount?.endDate?.message}
						/>
					</div>
				</div>

				<div className='space-y-3'>
					<div className='flex justify-between items-center'>
						<h3>Features</h3>
						<Button
							icon={<HiOutlinePlusCircle className='size-5' />}
							onClick={handleAddFeature}
						/>
					</div>

					<Table
						headers={[{ field: 'description', display: 'Description' }]}
						data={features || []}
						actions={[
							{
								name: 'Edit',
								callback: (_, index) => handleEditFeature(index),
							},
							{
								name: 'Delete',
								callback: (_, index) => handleConfirmRemoveFeature(index),
							},
						]}
					/>
				</div>

				<Checkbox {...register('isHighlighted')} label='Highlight' />

				<div className='flex justify-end gap-3'>
					<Button color='secondary' onClick={onClose}>
						Close
					</Button>
					<Button color='primary' type='submit'>
						{subscription ? 'Edit' : 'Add'}
					</Button>
				</div>
			</form>

			{openFeaturePopup && (
				<ClubSubscriptionFeatureFormPopup
					feature={currentFeature}
					onClose={toggleFeaturePopup}
					onSubmit={handleSubmitFeature}
				/>
			)}

			{openFeatureRemoveConfirmationPopup && (
				<ConfirmationPopup
					open={openFeatureRemoveConfirmationPopup}
					setOpen={setOpenFeatureRemoveConfirmationPopup}
					title='Remove Subscription'
					description='Are you sure you want to remove this subscription?'
					onConfirm={handleRemoveSubscription}
				/>
			)}
		</>
	);
}

export default ClubSubscriptionForm;
