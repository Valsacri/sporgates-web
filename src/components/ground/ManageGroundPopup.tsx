'use client';

import { Popup } from '@/components/utils/Popup';
import Button from '@/components/utils/Button';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GroundDto, GroundDtoType } from '@/dtos/item/ground.dto';
import ManageSubscriptionPopup from './ManageSubscriptionPopup';
import { useImages } from '@/client/hooks/utils/useImages';
import { Input } from '../utils/form/Input';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { Table } from '../utils/table/Table';
import MapboxMap from '../utils/Map';
import { ImagePicker } from '../utils/form/ImagePicker';
import OpeningHoursPicker from '../shared/OpeningHoursPicker';
import { useEffect } from 'react';
import { OpeningHours } from '@/types/business.types';
import Select from '../utils/form/Select';
import {
	getDownloadURL,
	ref as storageRef,
	uploadBytes,
	getStorage,
	deleteObject,
} from 'firebase/storage';

interface Props {
	children: React.ReactNode;
	ground?: GroundDtoType;
}

function ManageGroundPopup({ children, ground }: Props) {
	const [isOpen, toggleOpen] = usePopup();
	const [openSubscriptionPopup, toggleSubscriptionPopup] = usePopup();

	const {
		handleSubmit,
		register,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(GroundDto),
		defaultValues: ground || {
			name: '',
			description: '',
			images: [],
			openingHours: {
				monday: [],
				tuesday: [],
				wednesday: [],
				thursday: [],
				friday: [],
				saturday: [],
				sunday: [],
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

	const onSubmit = async (data: GroundDtoType) => {
		const [uploadedImagesUrls] = await Promise.all([
			handleUploadImages(),
			handleDeleteImages(),
		]);

		if (ground) {
			console.log('Editing ground:', data);
		} else {
			console.log('Creating ground:', data);
		}
		reset();
		toggleOpen();
	};

	const handleUploadImage = async (image: File) => {
		try {
			const ref = storageRef(getStorage(), `/images/grounds/${image.name}`);
			await uploadBytes(ref, image);
			const url = await getDownloadURL(ref);
			return url;
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteImage = async (imageUrl: string) => {
		try {
			const ref = storageRef(getStorage(), imageUrl);
			await deleteObject(ref);
		} catch (error) {
			console.error(error);
		}
	};

	const {
		imagesUrls,
		handleAddImages,
		handleRemoveImage,
		handleUploadImages,
		handleDeleteImages,
	} = useImages(
		// selectedItem?.image ? [selectedItem?.image] : [],
		ground?.images || [],
		handleUploadImage,
		handleDeleteImage
	);

	useEffect(() => {
		setValue('images', imagesUrls);
	}, [imagesUrls]);

	const neighborhoods = [
		{ value: 'maarif', label: 'Maarif' },
		{ value: 'ain-diab', label: 'Ain Diab' },
		{ value: 'california', label: 'California' },
	];

	const openingHours = watch('openingHours');

	const handleOpeningHoursChange = (openingHours: OpeningHours) => {
		setValue('openingHours', openingHours);
	};

	const handleCoordinatesChange = (lat: number, lng: number) => {
		alert(`Lat: ${lat}, Lng: ${lng}`);
		setValue('address.geoLocation', { lat, lng });
	};

	return (
		<>
			<div onClick={toggleOpen}>{children}</div>

			<Popup
				open={isOpen}
				title={ground ? 'Edit Ground' : 'Create a Ground'}
				description={
					ground
						? 'Edit the details of the ground.'
						: 'Fill in the details to add a new ground.'
				}
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
								error={errors.name?.message}
							/>
							<Input
								label='Description'
								{...register('description')}
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
								label='Minimum reservation time (min)'
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
								value={watch('address.city')}
								onChange={(city) => setValue('address.city', city)}
								options={neighborhoods}
								label='City'
								placeholder='Select a city'
								error={errors.address?.city?.message}
							/>
							<Select
								{...register('address.neighborhood')}
								value={watch('address.neighborhood')}
								onChange={(neighborhood) =>
									setValue('address.neighborhood', neighborhood)
								}
								options={neighborhoods}
								label='Neighborhood'
								placeholder='Select a neighborhood'
								error={errors.address?.neighborhood?.message}
							/>

							<div className='col-span-2 space-y-1'>
								<label className='text-sm'>Location</label>
								<MapboxMap
									lat={33.5731}
									lng={-7.5898}
									onCoordinatesChange={handleCoordinatesChange}
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

					<div className='space-y-3'>
						<h3 className='text-lg font-medium text-gray-900'>Opening hours</h3>
						<OpeningHoursPicker
							value={openingHours}
							onChange={handleOpeningHoursChange}
						/>
					</div>

					<div className='flex justify-end gap-3'>
						<Button color='secondary' onClick={toggleOpen}>
							Close
						</Button>
						{/* <Button color='primary' type='submit'> */}
						<Button color='primary' onClick={onSubmit as any}>
							{ground ? 'Save Changes' : 'Create'}
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
