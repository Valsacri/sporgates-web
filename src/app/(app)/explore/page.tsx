'use client';

import { useFetch } from '@/client/hooks/utils/useFetch';
import { CityClientService } from '@/client/services/geo/city.client-service';
import { TownClientService } from '@/client/services/geo/town.client-service';
import { GroundClientService } from '@/client/services/ground.client-service';
import GroundCard from '@/components/ground/GroundCard';
import Buttons from '@/components/profile/Buttons';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';
import {
	ALL_SELECT_OPTION,
	Select,
	SelectOption,
} from '@/components/utils/form/Select';
import Loader from '@/components/utils/Loader';
import { useForm } from 'react-hook-form';

function Page() {
	const { handleSubmit, register, reset, watch, setValue } = useForm({
		defaultValues: {
			keywords: '',
			city: 'all',
			town: 'all',
			type: 'grounds',
		},
	});

	const keywords = watch('keywords');
	const selectedCity = watch('city');
	const selectedTown = watch('town');
	const selectedType = watch('type');

	const { data: citiesOptions } = useFetch([], {
		async fetch() {
			const cities = await CityClientService.getPage();
			return [
				ALL_SELECT_OPTION,
				...cities.map(
					(city) => ({ value: city.id, label: city.name } as SelectOption)
				),
			];
		},
	});

	const { data: townsOptions } = useFetch(
		[],
		{
			async fetch() {
				if (selectedCity === 'all') return [ALL_SELECT_OPTION];

				const towns = await TownClientService.getPage(selectedCity);

				setValue('town', ALL_SELECT_OPTION.value);

				return [
					ALL_SELECT_OPTION,
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
						keywords: keywords === 'all' ? undefined : keywords.trim(),
						city: selectedCity === 'all' ? undefined : selectedCity,
						town: selectedTown === 'all' ? undefined : selectedTown,
					});
				}
				return [];
			},
		},
		[keywords, selectedCity, selectedTown, selectedType]
	);

	return (
		<div className='space-y-5'>
			<Card title='Explore' className='space-y-5'>
				Search for champs, grounds, and more...
				<div className='grid grid-cols-12 gap-5'>
					<Input
						{...register('keywords')}
						placeholder='Search'
						className='col-span-6'
					/>
					<Select
						{...register('city')}
						value={watch('city')}
						onChange={(value) => setValue('city', value)}
						placeholder='City'
						options={citiesOptions}
						className='col-span-3'
					/>
					<Select
						{...register('town')}
						value={watch('town')}
						onChange={(value) => setValue('town', value)}
						placeholder='Town'
						options={townsOptions}
						className='col-span-3'
					/>
				</div>
				<Buttons
					color='secondary'
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
			</Card>

			{loadingResults ? (
				<Loader className='size-20 mx-auto' />
			) : (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
					{results.map((ground) => (
						<GroundCard key={ground.id} ground={ground} />
					))}
				</div>
			)}
		</div>
	);
}

export default Page;
