'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { GroundClientService } from '@/client/services/ground.client-service';
import { SportClientService } from '@/client/services/sport.client-service';
import { GeoFilters } from '@/components/explore/GeoFilters';
import GroundCard from '@/components/ground/GroundCard';
import Buttons from '@/components/profile/Buttons';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';
import { Select, SelectOption } from '@/components/utils/form/Select';
import Loader from '@/components/utils/Loader';
import { Popup } from '@/components/utils/Popup';
import { GENERIC_ERROR_MESSAGE } from '@/constants';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LuRadar } from 'react-icons/lu';

function Page() {
	const showAlert = useContext(AlertContext);

	const [showRadiusPicker, setShowRadiusPicker] = useState(false);
	const [openGeoFiltersPopup, toggleGeoFiltersPopup] = usePopup();

	const form = useForm({
		defaultValues: {
			keywords: '',
			sport: 'all',
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
	const selectedSport = watch('sport');
	const selectedCity = watch('city');
	const selectedTown = watch('town');
	const selectedType = watch('type');
	const lat = watch('geolocation.lat');
	const lng = watch('geolocation.lng');
	const radius = watch('radius');

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
						sport: selectedSport === 'all' ? undefined : selectedSport,
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
			selectedSport,
			selectedCity,
			selectedTown,
			selectedType,
			showRadiusPicker,
			lat,
			lng,
			radius,
		]
	);

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
					color: 'danger',
					message: GENERIC_ERROR_MESSAGE,
				});
				return [];
			}
		},
	});

	return (
		<div className='fixed top-20 left-0 2xl:container mx-auto px-2 py-3 lg:px-16 h-[calc(100vh-64px-20px)] grid grid-cols-12 gap-5 space-y-5'>
			<Card
				title='Explore'
				className='col-span-12 md:col-span-6 xl:col-span-4 space-y-5 max-h-min overflow-y-auto'
			>
				Search for champs, grounds and clubs
				<div className='flex gap-4'>
					<Input {...register('keywords')} placeholder='Search' />
					<Select
						{...register('sport')}
						value={watch('sport')}
						onChange={(value) => setValue('sport', value)}
						placeholder='Sport'
						options={sportsOptions}
						loading={loadingSports}
					/>
				</div>
				<Buttons
					className='overflow-x-auto'
					color='secondary'
					stretch
					items={[
						{
							icon: 'two-',
							text: 'Champs',
							value: 'champs',
						},
						{
							icon: 'location',
							text: 'Grounds',
							value: 'grounds',
						},
						{
							icon: 'two-',
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
							showRadiusPicker={showRadiusPicker}
							toggleRadiusPicker={() => setShowRadiusPicker(!showRadiusPicker)}
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
								showRadiusPicker={showRadiusPicker}
								toggleRadiusPicker={() =>
									setShowRadiusPicker(!showRadiusPicker)
								}
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
							</>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Page;
