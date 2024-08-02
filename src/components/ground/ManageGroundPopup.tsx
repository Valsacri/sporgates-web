'use client';

import { useForm } from 'react-hook-form';
import { Popup } from '../utils/Popup';
import { Input } from '../utils/Input';
import { Select } from '../utils/Select';
import Button from '../utils/Button';
import { usePopup } from '@/hooks/usePopup';
import MapboxMap from '../utils/Map';
import { ImagePicker } from '../utils/ImagePicker';
import { useImages } from '@/hooks/useImages';
import { HiOutlinePlusCircle, HiOutlineTrash } from 'react-icons/hi';
import { Radio } from '../utils/Radio';
import ManagePricePopup from './ManagePricePopup';
import { Table } from '../utils/Table';

interface Props {
	children?: React.ReactNode;
}

function ManageGroundPopup({ children }: Props) {
	const [isOpen, toggleOpen] = usePopup();
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			name: '',
			description: '',
			address: {
				id: '',
				country: '',
				city: '',
				neighborhood: '',
				street: '',
				zip: '',
				geoLocation: {
					lat: 0,
					lng: 0,
				},
			},
			images: [],
			price: '',
			pricePeriod: '',
			discount: '',
			isDefault: false,
			rating: 0,
			reviews: 0,
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
							<Input {...register('name')} placeholder='Name' />
							<Input
								{...register('description')}
								placeholder='Description'
								rows={5}
							/>
						</div>
					</div>

					<div className='space-y-3'>
						<div className='flex justify-between items-center'>
							<h3 className='text-lg font-medium text-gray-900'>Pricing</h3>
							<ManagePricePopup>
								<Button icon={<HiOutlinePlusCircle className='size-5' />} />
							</ManagePricePopup>
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
							/>
							<Select
								{...register('address.neighborhood')}
								options={neighborhoods}
								placeholder='Neighborhood'
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
						<Button color='secondary' onClick={toggleOpen}>
							Close
						</Button>
						<Button type='submit' color='primary'>
							Create
						</Button>
					</div>
				</form>
			</Popup>
		</>
	);
}

export default ManageGroundPopup;
