'use client';

import { useContext } from 'react';
import withAuth from '@/client/hocs/withAuth.hoc';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { FormProvider, useForm } from 'react-hook-form';
import { AlertContext } from '@/client/contexts/alert.context';
import Card from '@/components/utils/Card';
import UserCard from '@/components/user/UserCard';
import GroundCard from '@/components/ground/GroundCard';
import Loader from '@/components/utils/Loader';
import { GENERIC_ERROR_MESSAGE } from '@/constants';
import ExploreFilters from '@/components/explore/ExploreFilters';
import { SportClientService } from '@/client/services/sport.client-service';
import { UserClientService } from '@/client/services/user.client-service';
import { GroundClientService } from '@/client/services/ground.client-service';
import { SelectOption } from '@/components/utils/form/Select';
import { User } from '@/types/user.types';
import { Ground } from '@/types/item/ground/ground.types';
import { Popup } from '@/components/utils/Popup';
import { BreakpointContext } from '@/client/contexts/breakpoint.context';
import Button from '@/components/utils/Button';

function Page() {
	const showAlert = useContext(AlertContext);
	const breakpoint = useContext(BreakpointContext)!;

	const form = useForm({
		defaultValues: {
			keywords: '',
			sport: '',
			city: '',
			town: '',
			type: 'champs',
			radius: 1,
			geolocation: { lat: 33.5731, lng: -7.5898 },
			shouldUseRadiusPicker: false,
		},
	});

	const { watch, setValue } = form;
	const selectedType = watch('type');
	const keywords = watch('keywords');
	const selectedSport = watch('sport');
	const selectedCity = watch('city');
	const selectedTown = watch('town');
	const lat = watch('geolocation.lat');
	const lng = watch('geolocation.lng');
	const radius = watch('radius');
	const shouldUseRadiusPicker = watch('shouldUseRadiusPicker');

	const [showFiltersPopup, toggleFiltersPopup] = usePopup();

	const {
		data: results,
		loading: loadingResults,
		setData: setResults,
	} = useFetch(
		[],
		{
			async fetch() {
				const filters = {
					keywords:
						keywords || shouldUseRadiusPicker ? undefined : keywords.trim(),
					sport: selectedSport ? undefined : selectedSport,
					city:
						selectedCity || shouldUseRadiusPicker ? undefined : selectedCity,
					town:
						selectedTown || shouldUseRadiusPicker ? undefined : selectedTown,
					lat: shouldUseRadiusPicker ? lat : undefined,
					lng: shouldUseRadiusPicker ? lng : undefined,
					radius: shouldUseRadiusPicker ? radius : undefined,
				};

				if (selectedType === 'champs') {
					return await UserClientService.getPage(filters);
				} else if (selectedType === 'grounds') {
					return await GroundClientService.getPage(filters);
				} else {
					return [];
				}
			},
		},
		[
			keywords,
			selectedSport,
			selectedCity,
			selectedTown,
			selectedType,
			shouldUseRadiusPicker,
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
					type: 'danger',
				});
				return [];
			}
		},
	});

	const handleTypeChange = (value: string) => () => {
		setResults([]);
		setValue('type', value);
	};

	return (
		<div className='grid grid-cols-12 gap-3 space-y-3'>
			<FormProvider {...form}>
				{breakpoint?.isDesktop && (
					<Card
						title='Filters'
						description='Filter the results by sport, town, and more'
						className='col-span-12 md:col-span-6 xl:col-span-4 h-min'
					>
						<ExploreFilters
							sportsOptions={sportsOptions}
							loadingSports={loadingSports}
							onTypeChange={handleTypeChange}
						/>
					</Card>
				)}

				{breakpoint?.isTablet && (
					<Card
						title='Filters'
						titleSuffix={
							!breakpoint?.isDesktop && (
								<Button icon='filter' onClick={toggleFiltersPopup} />
							)
						}
						className='col-span-12'
						description='Filter the results by sport, town, and more'
					></Card>
				)}

				{showFiltersPopup && (
					<Popup
						title='Filters'
						description='Filter the results by sport, town, and more'
						open={true}
						onClose={toggleFiltersPopup}
					>
						<ExploreFilters
							sportsOptions={sportsOptions}
							loadingSports={loadingSports}
							onTypeChange={handleTypeChange}
						/>
					</Popup>
				)}
			</FormProvider>

			<div className='col-span-12 xl:col-span-8 overflow-y-auto !mt-0'>
				{loadingResults ? (
					<div className='h-full flex justify-center items-center'>
						<Loader className='size-20' />
					</div>
				) : selectedType === 'champs' ? (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
						{((results as User[]) || []).map((user) => (
							<UserCard key={user.id} user={user} />
						))}
					</div>
				) : (
					<div className='grid grid-cols-1 xl:grid-cols-3 gap-3'>
						{((results as Ground[]) || []).map((ground) => (
							<GroundCard key={ground.id} ground={ground} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default withAuth(Page);
