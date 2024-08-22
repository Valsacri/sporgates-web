'use client';

import { Popup } from '@/components/utils/Popup';
import { Input } from '@/components/utils/form/Input';
import Button from '@/components/utils/Button';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GroundDto, GroundDtoType } from '@/dtos/item/ground.dto';
import { Select } from '../utils/form/Select';
import MapboxMap from '../utils/Map';
import { ImagePicker } from '../utils/form/ImagePicker';
import { useImages } from '@/client/hooks/utils/useImages';
import ManageSubscriptionPopup from './ManageSubscriptionPopup';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { Table } from '../utils/table/Table';
import { count } from 'console';

interface Props {
	children: React.ReactNode;
}

function ManageGroundPopup({ children }: Props) {
	const [isOpen, toggleOpen] = usePopup();
	const [openSubscriptionPopup, toggleSubscriptionPopup] = usePopup();

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(GroundDto),
		defaultValues: {
			name: '',
			description: '',
			images: [],
			openingHours: {
				monday: { start: '', end: '' },
				tuesday: { start: '', end: '' },
				wednesday: { start: '', end: '' },
				thursday: { start: '', end: '' },
				friday: { start: '', end: '' },
				saturday: { start: '', end: '' },
				sunday: { start: '', end: '' },
			},
			address: {
				country: '',
				city: '',
				neighborhood: '',
				street: '',
				zip: '',
				geoLocation: {
					lat: 0,
					lng: 0,
				},
				isDefault: false,
			},
			minReservationTime: 0,
			price: 0,
			busyHours: [],
			subscriptions: [],
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
		reset();
		toggleOpen();
	};

	const handleUploadImage = async (image: File) => {
		return 'https://via.placeholder.com/150';
	};

	const handleDeleteImage = async (imageUrl: string) => {
		console.log('delete image', imageUrl);
	};

	const {
		imagesUrls,
		unremovedImagesUrls,
		handleAddImages,
		handleRemoveImage,
		handleUploadImages,
		handleDeleteImages,
	} = useImages(
		// selectedItem?.image ? [selectedItem?.image] : [],
		[
			'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
			'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
			'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
			'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
			'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		],
		handleUploadImage,
		handleDeleteImage
	);

	const neighborhoods = [
		{ value: 'maarif', label: 'Maarif' },
		{ value: 'ain-diab', label: 'Ain Diab' },
		{ value: 'california', label: 'California' },
	];

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
				title='Create a ground'
				description='Fill in the details to add a new ground.'
				onClose={toggleOpen}
				className='w-full lg:w-1/2'
			>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
					<div className='space-y-3'>
						<h3 className='text-lg font-medium text-gray-900'>Infos</h3>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
							<Input
								label='Name'
								{...register('name')}
								placeholder='Name'
								error={errors.name?.message}
							/>
							<Input
								label='Description'
								{...register('description')}
								placeholder='Description'
								rows={5}
								error={errors.description?.message}
							/>
						</div>
					</div>

					<div className='space-y-3'>
						<h3 className='text-lg font-medium text-gray-900'>Pricing</h3>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
							<Input
								{...register('minReservationTime')}
								label='Minimum reservation time (minutes)'
								type='number'
								error={errors.minReservationTime?.message}
							/>
							<Input
								{...register('price')}
								label='Price'
								type='number'
								error={errors.price?.message}
							/>
						</div>
					</div>

					<div className='space-y-3'>
						<div className='flex justify-between items-center'>
							<h3 className='text-lg font-medium text-gray-900'>
								Subscriptions
							</h3>
							<Button
								icon={<HiOutlinePlusCircle className='size-5' />}
								onClick={toggleSubscriptionPopup}
							/>
						</div>

						<Table
							headers={[
								{ field: 'name', display: 'Name' },
								{ field: 'price', display: 'Price' },
								{ field: 'period', display: 'Period' },
								{ field: 'discount', display: 'Discount' },
							]}
							data={[
								{
									name: 'Ground 1',
									price: 100,
									period: 'day',
									discount: 10,
								},
								{
									name: 'Ground 2',
									price: 200,
									period: 'week',
									discount: 20,
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

					<div className='space-y-3'>
						<h3 className='text-lg font-medium text-gray-900'>Address</h3>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
							<Select
								{...register('address.city')}
								options={neighborhoods}
								placeholder='City'
								error={errors.address?.city?.message}
							/>
							<Select
								{...register('address.neighborhood')}
								options={neighborhoods}
								placeholder='Neighborhood'
								error={errors.address?.neighborhood?.message}
							/>

							<div className='col-span-2'>
								<MapboxMap
									lat={33.5731}
									lng={-7.5898}
									onCoordinatesChange={console.log}
								/>
							</div>
						</div>
					</div>

					<div className='space-y-3'>
						<h3 className='text-lg font-medium text-gray-900'>Images</h3>
						<ImagePicker
							onAddImages={handleAddImages}
							onDeleteImage={handleRemoveImage}
							imagesUrls={imagesUrls}
							maxImages={5}
						/>
					</div>

					<div className='flex justify-end gap-3'>
						<Button color='secondary'>Close</Button>
						<Button color='primary' type='submit'>
							Create
						</Button>
					</div>
				</form>

				<ManageSubscriptionPopup
					open={openSubscriptionPopup}
					onClose={() => toggleSubscriptionPopup()}
				/>
			</Popup>
		</>
	);
}

export default ManageGroundPopup;
