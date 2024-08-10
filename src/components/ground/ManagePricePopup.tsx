'use client';

import { useForm } from 'react-hook-form';
import { Popup } from '../utils/Popup';
import { Input } from '../utils/Input';
import { Select } from '../utils/Select';
import Button from '../utils/Button';
import { usePopup } from '@/hooks/utils/usePopup';
import { useImages } from '@/hooks/utils/useImages';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import ManagePriceFeaturePopup from './ManagePriceFeaturePopup';
import { Table } from '../utils/Table';

interface Props {
	children?: React.ReactNode;
}

function ManagePricePopup({ children }: Props) {
	const [isOpen, toggleOpen] = usePopup();
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			name: '',
			description: '',
			price: '',
			pricePeriodDuration: '',
			pricePeriodAmount: '',
			discount: '',
			discountEndDate: '',
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
		reset();
		toggleOpen();
	};

	const pricePeriods = [
		{ value: 'oneTime', label: 'One time' },
		{ value: 'hour', label: 'Hour' },
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' },
		{ value: 'year', label: 'Year' },
	];

	return (
		<>
			<div onClick={toggleOpen}>{children}</div>

			<Popup
				open={isOpen}
				title='Add a price'
				description='Fill in the details to add a new Price.'
				onClose={toggleOpen}
				className='w-full lg:w-1/3'
			>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
					<div className='space-y-3'>
						<h3>Infos</h3>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-3 items-center'>
							<Input {...register('name')} placeholder='Name' />
							<Input
								{...register('description')}
								placeholder='Description'
								rows={5}
							/>
						</div>
					</div>

					<div className='space-y-3'>
						<h3>Price</h3>
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-3 items-center'>
							<Input {...register('price')} placeholder='Price' type='number' />
							<Select
								{...register('pricePeriodDuration')}
								options={pricePeriods}
								placeholder='Period'
							/>
							<Input
								{...register('pricePeriodAmount')}
								placeholder='Duration'
								type='number'
							/>
						</div>
					</div>

					<div className='space-y-3'>
						<h3>Discount</h3>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-3 items-center'>
							<Input
								{...register('discount')}
								placeholder='Discount %'
								type='number'
							/>
							<Input {...register('discountEndDate')} placeholder='End date' />
						</div>
					</div>

					<div className='space-y-3'>
						<div className='flex justify-between items-center'>
							<h3>Features</h3>
							<ManagePriceFeaturePopup>
								<Button icon={<HiOutlinePlusCircle className='size-5' />} />
							</ManagePriceFeaturePopup>
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
						<Button color='secondary' onClick={toggleOpen}>
							Close
						</Button>
						<Button type='submit' color='primary'>
							Add
						</Button>
					</div>
				</form>
			</Popup>
		</>
	);
}

export default ManagePricePopup;
