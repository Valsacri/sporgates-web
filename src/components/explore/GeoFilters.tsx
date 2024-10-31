'use client';

import { useFormContext } from 'react-hook-form';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { LuRadar } from 'react-icons/lu';
import { Select, SelectOption } from '@/components/utils/form/Select';
import { SlidePicker } from '@/components/utils/form/SlidePicker';
import MapboxMap from '@/components/utils/Map';
import { GeoLocation } from '@/types/geo.types';
import Button from '../utils/Button';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { CityClientService } from '@/client/services/geo/city.client-service';
import { TownClientService } from '@/client/services/geo/town.client-service';
import { UserContext } from '@/client/contexts/user.context';
import { useContext } from 'react';

interface GeoFiltersPopupProps {
	showRadiusPicker: boolean;
	toggleRadiusPicker: () => void;
}

export function GeoFilters({
	showRadiusPicker,
	toggleRadiusPicker,
}: GeoFiltersPopupProps) {
	const { register, watch, setValue } = useFormContext();
	const [user] = useContext(UserContext);

	const selectedCity = watch('city');
	const lat = watch('geolocation.lat');
	const lng = watch('geolocation.lng');
	const radius = watch('radius');

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
		<div className='space-y-4'>
			<div className='flex gap-4'>
				<Select
					{...register('city')}
					value={watch('city')}
					onChange={(value) => setValue('city', value)}
					placeholder='City'
					options={citiesOptions}
					className='col-span-3'
					loading={loadingCities}
					disabled={showRadiusPicker}
				/>
				<Select
					{...register('town')}
					value={watch('town')}
					onChange={(value) => setValue('town', value)}
					placeholder='Town'
					options={townsOptions}
					className='col-span-3'
					loading={loadingTowns}
					disabled={showRadiusPicker}
				/>
			</div>

			<Button
				color={showRadiusPicker ? 'primary' : 'secondary'}
				icon={<LuRadar className='size-5 mr-1' />}
				className='w-full'
				onClick={toggleRadiusPicker}
			>
				Geographic range{' '}
				{showRadiusPicker ? (
					<BiChevronUp className='size-5' />
				) : (
					<BiChevronDown className='size-5' />
				)}
			</Button>

			{showRadiusPicker && (
				<>
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
				</>
			)}
		</div>
	);
}
