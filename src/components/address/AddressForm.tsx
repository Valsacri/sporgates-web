'use client';

import useCitiesAndTownsOptions from '@/client/hooks/useCitiesAndTownsOptions';
import Button from '@/components/utils/Button';
import { Input } from '@/components/utils/form/Input';
import { Select } from '@/components/utils/form/Select';
import MapboxMap from '@/components/utils/Map';
import { AddressDto, CreateAddressDtoType } from '@/dtos/item/general.dto';
import { Address, City, GeoLocation, Town } from '@/types/geo.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface Props {
	onSubmit: (address: CreateAddressDtoType) => any;
	init?: Address | null;
}

function AddressForm({ onSubmit, init }: Props) {
	const { register, setValue, watch, formState, handleSubmit } = useForm({
		resolver: zodResolver(AddressDto),
		defaultValues: {
			label: init?.label || '',
			city: (init?.city as City)?.id || '',
			town: (init?.town as Town)?.id || '',
			geoLocation: init?.geoLocation || { lat: 33.5731, lng: -7.5898 },
		},
	});

	const selectedCity = watch('city');
	const selectedTown = watch('town');

	const [
		{ data: citiesOptions },
		{ data: townsOptions, loading: loadingTowns },
	] = useCitiesAndTownsOptions(selectedCity);

	const handleCoordinatesChange = (geoLocation: GeoLocation) => {
		setValue('geoLocation', geoLocation);
	};

	return (
		<form
			className='grid grid-cols-2 gap-3 items-end'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				{...register('label')}
				label='Label'
				placeholder='Enter a label'
				error={formState.errors.label?.message}
				className='col-span-2'
			/>
			<Select
				{...register('city')}
				value={selectedCity}
				onChange={(city) => setValue('city', city as string)}
				options={citiesOptions}
				label='City'
				placeholder='Select a city'
				error={formState.errors.city?.message}
			/>
			<Select
				{...register('town')}
				value={selectedTown}
				onChange={(town) => setValue('town', town as string)}
				options={townsOptions}
				label='Town'
				placeholder='Select a town'
				error={formState.errors.town?.message}
				disabled={loadingTowns}
			/>

			<div className='col-span-2 space-y-1'>
				<label className='text-sm'>Location</label>
				<MapboxMap
					lat={33.5731}
					lng={-7.5898}
					onCoordinatesChange={handleCoordinatesChange}
				/>
			</div>

			<Button
				type='submit'
				className='col-span-2'
				color='primary'
				loading={formState.isSubmitting}
			>
				Save
			</Button>
		</form>
	);
}

export default AddressForm;
