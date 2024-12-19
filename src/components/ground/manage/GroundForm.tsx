'use client';

import Button from '@/components/utils/Button';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GroundDto, GroundDtoType } from '@/dtos/item/ground/ground.dto';
import { useImages } from '@/client/hooks/utils/useImages';
import { Input } from '../../utils/form/Input';
import { ImagePicker } from '../../utils/form/ImagePicker';
import OpeningHoursPicker from '../../shared/OpeningHoursPicker';
import { useContext, useEffect, useState } from 'react';
import { OpeningHours } from '@/types/business.types';
import { GroundClientService } from '@/client/services/ground.client-service';
import { Ground } from '@/types/item/ground/ground.types';
import { Select, SelectOption } from '../../utils/form/Select';
import { useRouter } from 'next/navigation';
import { StorageHelper } from '@/client/helpers/storage.helper';
import { Address } from '@/types/geo.types';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { AlertContext } from '@/client/contexts/alert.context';
import { SportClientService } from '@/client/services/sport.client-service';
import AddressManager from '@/components/address/AddressManager';
import { Popup } from '@/components/utils/Popup';
import GroundAddress from '../details/GroundAddress';

interface Props {
	businessId?: string;
	ground?: Ground;
	onClose?: () => void;
}

function GroundForm({ businessId, ground, onClose }: Props) {
	const [openSubscriptionPopup, toggleSubscriptionPopup] = usePopup();
	const [
		openSubscriptionRemoveConfirmationPopup,
		,
		setOpenSubscriptionRemoveConfirmationPopup,
	] = usePopup();

	const [openAddressPopup, toggleOpenAddressPopup] = usePopup();

	const router = useRouter();
	const showAlert = useContext(AlertContext);

	const {
		handleSubmit,
		register,
		reset,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(GroundDto),
		defaultValues: {
			business: businessId,
			name: ground?.name || '',
			description: ground?.description || '',
			images: ground?.images || [],
			openingHours: {
				monday: ground?.openingHours.monday || [],
				tuesday: ground?.openingHours.tuesday || [],
				wednesday: ground?.openingHours.wednesday || [],
				thursday: ground?.openingHours.thursday || [],
				friday: ground?.openingHours.friday || [],
				saturday: ground?.openingHours.saturday || [],
				sunday: ground?.openingHours.sunday || [],
			},
			address: (ground?.address as Address)?.id || '',
			minReservationTime: ground?.minReservationTime || 60,
			price: ground?.price || 0,
			sports: ground?.sports || [],
			// subscriptions: [],
		} as GroundDtoType,
	});

	const selectedAddress = watch('address');
	const openingHours = watch('openingHours') as OpeningHours;
	// const subscriptions = watch('subscriptions') || [];
	const selectedSports = watch('sports');

	const [address, setAddress] = useState<Address>(ground?.address as Address);
	// const [currentSubscriptionIndex, setCurrentSubscriptionIndex] = useState(-1);
	// const currentSubscription = subscriptions[currentSubscriptionIndex];

	const onSubmit = async (data: GroundDtoType) => {
		const [uploadedImages] = await Promise.all([
			handleUploadImages(),
			handleDeleteImages(),
		]);

		const images = [...uploadedImages, ...unremovedImagesUrls];

		const newGround: GroundDtoType = {
			...data,
			images,
		};

		if (ground) {
			await GroundClientService.update(ground.id as string, newGround);
		} else {
			await GroundClientService.create(newGround);
		}
		router.refresh();
		reset();
		onClose?.();
	};

	const { data: sportsOptions, loading: loadingSports } = useFetch([], {
		async fetch() {
			try {
				const sports = await SportClientService.getAll();
				return [
					{ value: 'all', label: 'All sports' },
					...sports.map(
						(sport) => ({ value: sport.id, label: sport.name } as SelectOption)
					),
				];
			} catch (error) {
				console.error(error);
				showAlert({
					type: 'danger',
				});
				return [];
			}
		},
	});

	const handleUploadImage = async (image: File) => {
		try {
			const url = await StorageHelper.uploadFile('/images/grounds', image);
			return url;
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteImage = async (imageUrl: string) => {
		try {
			await StorageHelper.deleteFile(imageUrl);
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
		unremovedImagesUrls,
	} = useImages(
		// selectedItem?.image ? [selectedItem?.image] : [],
		ground?.images || [],
		handleUploadImage,
		handleDeleteImage
	);

	useEffect(() => {
		setValue('images', imagesUrls);
	}, [imagesUrls]);

	const handleOpeningHoursChange = (openingHours: OpeningHours) => {
		setValue('openingHours', openingHours);
	};

	const handleSelectAddress = (address: Address) => {
		setValue('address', address.id);
		setAddress(address);
		toggleOpenAddressPopup();
	};

	// const handleSubmitSubscription = (subscription: SubscriptionDtoType) => {
	// 	if (currentSubscriptionIndex === -1) {
	// 		setValue('subscriptions', [...subscriptions, subscription]);
	// 	} else {
	// 		subscriptions?.splice(currentSubscriptionIndex, 1, subscription);
	// 		setValue('subscriptions', subscriptions);
	// 	}
	// };

	// const handleAddSubscription = () => {
	// 	setCurrentSubscriptionIndex(-1);
	// 	toggleSubscriptionPopup();
	// };

	// const handleEditSubscription = (index: number) => {
	// 	setCurrentSubscriptionIndex(index);
	// 	toggleSubscriptionPopup();
	// };

	// const handleRemoveSubscription = () => {
	// 	subscriptions?.splice(currentSubscriptionIndex, 1);
	// 	setValue('subscriptions', subscriptions);
	// };

	// const handleConfirmRemoveSubscription = (index: number) => {
	// 	setCurrentSubscriptionIndex(index);
	// 	setOpenSubscriptionRemoveConfirmationPopup(true);
	// };

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
				<div className='space-y-3'>
					<h3 className='text-lg font-medium text-gray-900'>Infos</h3>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
						<Input
							label='Name'
							placeholder='Ground name'
							{...register('name')}
							error={errors.name?.message}
						/>
						<Input
							label='Description'
							placeholder='Ground description'
							{...register('description')}
							multiline
							error={errors.description?.message}
						/>
						<Select
							{...register('sports')}
							value={selectedSports}
							onChange={(value) => setValue('sports', value as string[])}
							placeholder='Sports'
							options={sportsOptions}
							loading={loadingSports}
							className='col-span-2'
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

				{/* <div className='space-y-3'>
					<div className='flex justify-between items-center'>
						<h3 className='text-lg font-medium text-gray-900'>Subscriptions</h3>
						<Button
							icon={<HiOutlinePlusCircle className='size-5' />}
							onClick={handleAddSubscription}
						/>
					</div>

					<Table
						headers={[
							{ field: 'name', display: 'Name' },
							{ field: 'price', display: 'Price' },
							{
								field: (row) => `${row.period.amount} ${row.period.duration}`,
								display: 'Period',
							},
							{
								field: (row) =>
									`${row.discount.amount}% until ${row.discount.endDate}`,
								display: 'Discount',
							},
						]}
						data={subscriptions || []}
						actions={[
							{
								name: 'Edit',
								callback: (_, index) => handleEditSubscription(index),
							},
							{
								name: 'Delete',
								callback: (_, index) => handleConfirmRemoveSubscription(index),
							},
						]}
					/>
				</div> */}

				<div className='space-y-3'>
					<div className='flex justify-between items-center'>
						<h3 className='text-lg font-medium text-gray-900'>Address</h3>
						<Button icon='edit' onClick={toggleOpenAddressPopup} />
					</div>

					<GroundAddress address={address} />
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
					<Button color='secondary' onClick={onClose}>
						Close
					</Button>
					<Button color='primary' type='submit' loading={isSubmitting}>
						{ground ? 'Update' : 'Create'}
					</Button>
				</div>
			</form>

			<Popup
				open={openAddressPopup}
				onClose={toggleOpenAddressPopup}
				hideCloseButton
				className='p-0 border-none'
			>
				<AddressManager onSelect={handleSelectAddress} hideActions />
			</Popup>

			{/* {openSubscriptionPopup && (
				<ClubSubscriptionFormPopup
					subscription={currentSubscription}
					onClose={toggleSubscriptionPopup}
					onSubmit={handleSubmitSubscription}
				/>
			)}

			{openSubscriptionRemoveConfirmationPopup && (
				<ConfirmationPopup
					open={openSubscriptionRemoveConfirmationPopup}
					setOpen={setOpenSubscriptionRemoveConfirmationPopup}
					title='Remove Subscription'
					description='Are you sure you want to remove this subscription?'
					onConfirm={handleRemoveSubscription}
				/>
			)} */}
		</>
	);
}

export default GroundForm;
