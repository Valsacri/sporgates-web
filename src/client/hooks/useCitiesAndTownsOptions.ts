import { useContext } from 'react';
import { useFetch } from './utils/useFetch';
import { CityClientService } from '../services/geo/city.client-service';
import { AlertContext } from '../contexts/alert.context';
import { TownClientService } from '../services/geo/town.client-service';
import { SelectOption } from '@/components/utils/form/Select';

function useCitiesAndTownsOptions(selectedCity: string) {
	const showAlert = useContext(AlertContext);

	const citiesFetch = useFetch([], {
		async fetch() {
			try {
				const cities = await CityClientService.getPage();
				return cities.map(
					(city) => ({ value: city.id, label: city.name } as SelectOption)
				);
			} catch (error) {
				console.log(error);
				showAlert({
					type: 'danger',
				});
				return [];
			}
		},
	});

	const townsFetch = useFetch(
		[],
		{
			async fetch() {
				if (!selectedCity) return [];

				const towns = await TownClientService.getPage(selectedCity);

				return towns.map(
					(town) => ({ value: town.id, label: town.name } as SelectOption)
				);
			},
		},
		[selectedCity]
	);

	return [citiesFetch, townsFetch];
}

export default useCitiesAndTownsOptions;
