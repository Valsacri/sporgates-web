'use client';

import { useFormContext } from 'react-hook-form';
import Buttons from '@/components/profile/Buttons';
import { Input } from '@/components/utils/form/Input';
import { Select, SelectOption } from '@/components/utils/form/Select';
import Button from '@/components/utils/Button';
import { LuRadar } from 'react-icons/lu';
import { CocoIcon } from '@/client/config/coco-icons';
import { SlidePicker } from '../utils/form/SlidePicker';
import { CityClientService } from '@/client/services/geo/city.client-service';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { TownClientService } from '@/client/services/geo/town.client-service';
import { GeoLocation } from '@/types/geo.types';
import MapboxMap from '../utils/Map';
import { twMerge } from 'tailwind-merge';

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
	const { register, watch, setValue } = useFormContext();
	const selectedType = watch('type');
	const selectedSport = watch('sport');
	const selectedCity = watch('city');
	const lat = watch('geolocation.lat');
	const lng = watch('geolocation.lng');
	const radius = watch('radius');
	const shouldUseRadiusPicker = watch('shouldUseRadiusPicker');

	const { data: citiesOptions, loading: loadingCities } = useFetch([], {
		async fetch() {
			const cities = await CityClientService.getPage();
			return [
				{ value: 'all', label: 'All cities' },
				...cities.map(
					(city) => ({ value: city.id, label: city.name } as SelectOption)
				),
			];
		},
	});

	const { data: townsOptions, loading: loadingTowns } = useFetch(
		[],
		{
			async fetch() {
				if (selectedCity === 'all')
					return [{ value: 'all', label: 'All towns' }];

				const towns = await TownClientService.getPage(selectedCity);

				setValue('town', 'all');

				return [
					{ value: 'all', label: 'All towns' },
					...towns.map(
						(town) => ({ value: town.id, label: town.name } as SelectOption)
					),
				];
			},
		},
		[selectedCity]
	);

	const handleCoordinatesChange = (coordinates: GeoLocation) => {
		setValue('geolocation.lat', coordinates.lat);
		setValue('geolocation.lng', coordinates.lng);
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
		</div>
	);
}

export default ExploreFilters;
