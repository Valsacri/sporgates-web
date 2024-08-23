'use client';

import { useForm } from 'react-hook-form';
import { Popup } from '../utils/Popup';
import { Input } from '../utils/form/Input';
import Button from '../utils/Button';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import ManageSubscriptionFeaturePopup from './ManageSubscriptionFeaturePopup';
import { Table } from '../utils/table/Table';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubscriptionDto } from '@/dtos/item/club.dto';
import { SubscriptionPeriodDuration } from '@/types/item/club.types';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { DatePicker } from '../utils/form/DatePicker';
import Select from '../utils/form/Select';

interface Props {
	open: boolean;
	onClose: () => void;
}

function ManageSubscriptionPopup({ open, onClose }: Props) {
	const [openFeaturePopup, toggleFeaturePopup] = usePopup();

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
				duration: SubscriptionPeriodDuration.ONCE,
				amount: 0,
			},
			discount: {
				amount: 0,
				endDate: '',
			},
			isDefault: false,
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
		reset();
		onClose();
	};

	const priceDurations = [
		{ value: 'oneTime', label: 'One time' },
		{ value: 'hour', label: 'Hour' },
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' },
		{ value: 'year', label: 'Year' },
	];

	const discountEndDate = watch('discount.endDate');

	const hangleDatePickerChange = (date: string) =>
		setValue('discount.endDate', date);

	return (
		<Popup
			open={open}
			title='Add a subscription'
			description='Fill in the details to add a new subscription.'
			onClose={onClose}
			className='w-full lg:w-1/2'
		>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
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
							rows={5}
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
							onChange={(value) => setValue('period.duration', value as SubscriptionPeriodDuration)}
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
							onClick={toggleFeaturePopup}
						/>
					</div>

					<Table
						headers={[{ field: 'description', display: 'Description' }]}
						data={[
							{
								description:
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
							},
							{
								description:
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
							},
						]}
						actions={[
							{
								name: 'Edit',
							},
							{
								name: 'Delete',
							},
						]}
					/>
				</div>

				<div className='flex justify-end gap-3'>
					<Button color='secondary' onClick={onClose}>
						Close
					</Button>
					<Button color='primary' type='submit'>
						Add
					</Button>
				</div>
			</form>

			<ManageSubscriptionFeaturePopup
				open={openFeaturePopup}
				onClose={toggleFeaturePopup}
			/>
		</Popup>
	);
}

export default ManageSubscriptionPopup;
