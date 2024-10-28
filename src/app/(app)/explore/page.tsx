'use client';

import { UserContext } from '@/client/contexts/user.context';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { CityClientService } from '@/client/services/geo/city.client-service';
import { TownClientService } from '@/client/services/geo/town.client-service';
import { GroundClientService } from '@/client/services/ground.client-service';
import { GeoFilters } from '@/components/explore/GeoFilters';
import GroundCard from '@/components/ground/GroundCard';
import Buttons from '@/components/profile/Buttons';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';
import { Select, SelectOption } from '@/components/utils/form/Select';
import { SlidePicker } from '@/components/utils/form/SlidePicker';
import Loader from '@/components/utils/Loader';
import MapboxMap from '@/components/utils/Map';
import { Popup } from '@/components/utils/Popup';
import { GeoLocation } from '@/types/geo.types';
import { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiChevronDown, BiChevronUp, BiRadar } from 'react-icons/bi';
import { GiRadarSweep } from 'react-icons/gi';
import { LuRadar } from 'react-icons/lu';

function Page() {
	const [user] = useContext(UserContext);

	const [showRadiusPicker, setShowRadiusPicker] = useState(false);
	const [openGeoFiltersPopup, toggleGeoFiltersPopup] = usePopup();

	const form = useForm({
		defaultValues: {
			keywords: '',
			city: 'all',
			town: 'all',
			type: 'grounds',
			radius: 1,
			geolocation: {
				lat: 33.5731,
				lng: -7.5898,
			},
		},
	});
	const { handleSubmit, register, reset, watch, setValue } = form;

	const keywords = watch('keywords');
	const selectedCity = watch('city');
	const selectedTown = watch('town');
	const selectedType = watch('type');
	const lat = watch('geolocation.lat');
	const lng = watch('geolocation.lng');
	const radius = watch('radius');

	const { data: citiesOptions, loading: loadingCities } = useFetch(
		[],
		{
			async fetch() {
				const cities = await CityClientService.getPage();
				return [
					{ value: 'all', label: 'All cities' },
					...cities.map(
						(city) => ({ value: city.id, label: city.name } as SelectOption)
					),
				];
			},
		},
		[user]
	);

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

	const { data: results, loading: loadingResults } = useFetch(
		[],
		{
			async fetch() {
				if (selectedType === 'grounds') {
					return await GroundClientService.getAll({
						keywords:
							keywords === 'all' || showRadiusPicker
								? undefined
								: keywords.trim(),
						city:
							selectedCity === 'all' || showRadiusPicker
								? undefined
								: selectedCity,
						town:
							selectedTown === 'all' || showRadiusPicker
								? undefined
								: selectedTown,
						lat: showRadiusPicker ? lat : undefined,
						lng: showRadiusPicker ? lng : undefined,
						radius: showRadiusPicker ? radius : undefined,
					});
				}
				return [];
			},
		},
		[
			keywords,
			selectedCity,
			selectedTown,
			selectedType,
			showRadiusPicker,
			lat,
			lng,
			radius,
		]
	);

	const handleCoordinatesChange = (coordinates: GeoLocation) => {
		setValue('geolocation.lat', coordinates.lat);
		setValue('geolocation.lng', coordinates.lng);
	};

	return (
		<div className='fixed top-20 left-0 2xl:container mx-auto px-2 py-3 lg:px-16 h-[calc(100vh-64px-20px)] grid grid-cols-12 gap-5 space-y-5'>
			<Card
				title='Explore'
				className='col-span-12 md:col-span-6 xl:col-span-4 space-y-5 max-h-min overflow-y-auto'
			>
				Search for champs, grounds, clubs and more...
				<Input
					{...register('keywords')}
					placeholder='Search'
					className='col-span-6'
				/>
				<Buttons
					color='secondary'
					stretch
					items={[
						{
							icon: 'two-user',
							text: 'Champs',
							value: 'champs',
						},
						{
							icon: 'location',
							text: 'Grounds',
							value: 'grounds',
						},
						{
							icon: 'two-user',
							text: 'Clubs',
							value: 'clubs',
						},
					].map(
						(item) =>
							({
								icon: item.icon,
								text: item.text,
								onClick: () => setValue('type', item.value),
								selected: selectedType === item.value,
							} as any)
					)}
				/>
				<Button
					color='secondary'
					icon={<LuRadar className='size-5 mr-1' />}
					className='w-full lg:hidden'
					onClick={() => toggleGeoFiltersPopup()}
				>
					Find by location
				</Button>
				<FormProvider {...form}>
					<div className='hidden lg:block'>
						<GeoFilters
							citiesOptions={citiesOptions}
							townsOptions={townsOptions}
							loadingCities={loadingCities}
							loadingTowns={loadingTowns}
							showRadiusPicker={showRadiusPicker}
							toggleRadiusPicker={() => setShowRadiusPicker(!showRadiusPicker)}
							lat={lat}
							lng={lng}
							radius={radius}
							handleCoordinatesChange={handleCoordinatesChange}
						/>
					</div>
					{openGeoFiltersPopup && (
						<Popup
							title='Find by location'
							open={true}
							onClose={toggleGeoFiltersPopup}
							className='space-y-5'
						>
							<GeoFilters
								citiesOptions={citiesOptions}
								townsOptions={townsOptions}
								loadingCities={loadingCities}
								loadingTowns={loadingTowns}
								showRadiusPicker={showRadiusPicker}
								toggleRadiusPicker={() =>
									setShowRadiusPicker(!showRadiusPicker)
								}
								lat={lat}
								lng={lng}
								radius={radius}
								handleCoordinatesChange={handleCoordinatesChange}
							/>
						</Popup>
					)}
				</FormProvider>
			</Card>

			<div className='col-span-12 md:col-span-6 xl:col-span-8 overflow-y-auto !mt-0'>
				{loadingResults ? (
					<div className='h-full flex justify-center items-center '>
						<Loader className='size-20 mx-auto' />
					</div>
				) : (
					<div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
						{results.map((ground) => (
							<>
								<GroundCard key={ground.id} ground={ground} />
								<GroundCard key={ground.id} ground={ground} />
								<GroundCard key={ground.id} ground={ground} />
								<GroundCard key={ground.id} ground={ground} />
								<GroundCard key={ground.id} ground={ground} />
								<GroundCard key={ground.id} ground={ground} />
								<GroundCard key={ground.id} ground={ground} />
							</>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Page;
