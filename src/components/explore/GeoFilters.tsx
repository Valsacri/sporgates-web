'use client';

import { useFormContext } from 'react-hook-form';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { LuRadar } from 'react-icons/lu';
import { Select, SelectOption } from '@/components/utils/form/Select';
import { SlidePicker } from '@/components/utils/form/SlidePicker';
import MapboxMap from '@/components/utils/Map';
import { GeoLocation } from '@/types/geo.types';
import Button from '../utils/Button';

interface GeoFiltersPopupProps {
	citiesOptions: SelectOption[];
	townsOptions: SelectOption[];
	loadingCities: boolean;
	loadingTowns: boolean;
	showRadiusPicker: boolean;
	toggleRadiusPicker: () => void;
	lat: number;
	lng: number;
	radius: number;
	handleCoordinatesChange: (coordinates: GeoLocation) => void;
}

export function GeoFilters({
	citiesOptions,
	townsOptions,
	loadingCities,
	loadingTowns,
	showRadiusPicker,
	toggleRadiusPicker,
	lat,
	lng,
	radius,
	handleCoordinatesChange,
}: GeoFiltersPopupProps) {
	const { register, watch, setValue } = useFormContext();

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
