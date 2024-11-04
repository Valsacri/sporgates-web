'use client';

import { Select, SelectOption } from '@/components/utils/form/Select';
import Buttons, { ButtonItem } from '@/components/profile/Buttons';
import { GroundRerservationStatus } from '@/types/item/ground/ground.types';
import { useFormContext } from 'react-hook-form';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { GroundClientService } from '@/client/services/ground.client-service';
import { AlertContext } from '@/client/contexts/alert.context';
import { useContext } from 'react';

interface Props {
	businessId: string;
}

export default function ReservationFilters({ businessId }: Props) {
	const showAlert = useContext(AlertContext);

	const { register, watch, setValue } = useFormContext();
	const selectedGround = watch('ground');
	const selectedStatus = watch('status');

	const { data: groundOptions } = useFetch([], {
		async fetch() {
			try {
				const grounds = await GroundClientService.getAll({
					business: businessId,
				});
				return [
					{ value: 'all', label: 'All grounds' },
					...grounds.map(({ id, name }) => ({ value: id, label: name })),
				];
			} catch (error) {
				console.error(error);
				showAlert({ color: 'danger', message: 'Error while fetching grounds' });
				return [];
			}
		},
	});

	return (
		<>
			<Select
				{...register('ground')}
				value={selectedGround}
				onChange={(value) => setValue('ground', value)}
				placeholder='Select a ground'
				options={groundOptions}
			/>
			<Buttons
				className='overflow-x-auto space-y-5'
				color='secondary'
				items={(
					[
						'all',
						'pending',
						'accepted',
						'rejected',
						'ongoing',
						'cancelled',
					] as GroundRerservationStatus[]
				).map(
					(status) =>
						({
							text: status.charAt(0).toUpperCase() + status.slice(1),
							onClick: () => setValue('status', status),
							selected: selectedStatus === status,
						} as ButtonItem)
				)}
			/>
		</>
	);
}
