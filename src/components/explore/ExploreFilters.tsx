'use client';

import { useFormContext } from 'react-hook-form';
import Buttons from '@/components/profile/Buttons';
import { Input } from '@/components/utils/form/Input';
import { Select, SelectOption } from '@/components/utils/form/Select';
import Button from '@/components/utils/Button';
import { LuRadar } from 'react-icons/lu';
import { CocoIcon } from '@/client/config/coco-icons';
import { SlidePicker } from '../utils/form/SlidePicker';
import { Address, City, GeoLocation, Town } from '@/types/geo.types';
import MapboxMap from '../utils/Map';
import { twMerge } from 'tailwind-merge';
import useCitiesAndTownsOptions from '@/client/hooks/useCitiesAndTownsOptions';
import { useEffect } from 'react';
import { Popup } from '../utils/Popup';
import AddressManager from '../address/AddressManager';
import { usePopup } from '@/client/hooks/utils/usePopup';

interface Props {
	sportsOptions?: SelectOption[];
	loadingSports?: boolean;
	onTypeChange: (type: string) => any;
}

function ExploreFilters({
	sportsOptions = [],
	loadingSports = false,
	onTypeChange,
}: Props) {
	const [openAddressPopup, toggleAddressPopup] = usePopup(false);

	const { register, watch, setValue } = useFormContext();

	const selectedType = watch('type');
	const selectedSport = watch('sport');
	const selectedCity = watch('city');
	const lat = watch('geolocation.lat');
	const lng = watch('geolocation.lng');
	const radius = watch('radius');
	const shouldUseRadiusPicker = watch('shouldUseRadiusPicker');

	const [
		{ data: citiesOptions, loading: loadingCities },
		{ data: townsOptions, loading: loadingTowns },
	] = useCitiesAndTownsOptions(selectedCity, true);

	useEffect(() => {
		if (!citiesOptions) {
			setValue('town', '');
		}
	}, [citiesOptions]);

	const handleCoordinatesChange = (coordinates: GeoLocation) => {
		setValue('geolocation.lat', coordinates.lat);
		setValue('geolocation.lng', coordinates.lng);
	};

	const handleSelectAddress = (address: Address) => {
		setValue('city', (address.city as City).id);
		setValue('town', (address.town as Town).id);
		setValue('geolocation.lat', address.geoLocation.lat);
		setValue('geolocation.lng', address.geoLocation.lng);
		toggleAddressPopup();
	};

	return (
		<div className='overflow-y-auto space-y-3'>
			<Buttons
				className='overflow-x-auto'
				stretch
				items={[
					{ icon: 'user', text: 'Champs', value: 'champs' },
					{ icon: 'location', text: 'Grounds', value: 'grounds' },
				].map((item) => ({
					icon: item.icon as CocoIcon,
					text: item.text,
					onClick: onTypeChange(item.value),
					selected: selectedType === item.value,
				}))}
			/>

			<div className='flex gap-3'>
				<Input {...register('keywords')} placeholder='Search' />
				<Select
					{...register('sport')}
					value={selectedSport}
					onChange={(value) => setValue('sport', value)}
					placeholder='Sport'
					options={sportsOptions}
					loading={loadingSports}
				/>
			</div>

			<Button
				color='secondary'
				icon='location'
				className='w-full'
				onClick={toggleAddressPopup}
			>
				Use existing address
			</Button>

			<div className='space-y-3'>
				<div className='flex gap-3'>
					<Select
						{...register('city')}
						value={watch('city')}
						onChange={(value) => setValue('city', value)}
						placeholder='City'
						options={citiesOptions}
						className='col-span-3'
						loading={loadingCities}
						disabled={shouldUseRadiusPicker}
					/>
					<Select
						{...register('town')}
						value={watch('town')}
						onChange={(value) => setValue('town', value)}
						placeholder='Town'
						options={townsOptions}
						className='col-span-3'
						loading={loadingTowns}
						disabled={shouldUseRadiusPicker}
					/>
				</div>

				<Button
					color={shouldUseRadiusPicker ? 'primary' : 'secondary'}
					icon={<LuRadar className='size-5 mr-1' />}
					className='w-full'
					onClick={() =>
						setValue('shouldUseRadiusPicker', !shouldUseRadiusPicker)
					}
				>
					Use geographic range
				</Button>

				<div
					className={twMerge(
						!shouldUseRadiusPicker && 'opacity-50 pointer-events-none'
					)}
				>
					<SlidePicker
						{...register('radius', { valueAsNumber: true })}
						value={radius}
						label='Radius (km)'
						min={1}
						max={5}
						step={0.5}
					/>
					<MapboxMap
						lat={lat}
						lng={lng}
						radius={radius}
						onCoordinatesChange={handleCoordinatesChange}
					/>
				</div>
			</div>

			<Popup
				open={openAddressPopup}
				onClose={toggleAddressPopup}
				hideCloseButton
				className='p-0 border-none'
			>
				<AddressManager onSelect={handleSelectAddress} hideActions />
			</Popup>
		</div>
	);
}

export default ExploreFilters;
