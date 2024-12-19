'use client';

import { Select } from '@/components/utils/form/Select';
import Buttons, { ButtonItem } from '@/components/profile/Buttons';
import { useFormContext } from 'react-hook-form';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { GroundClientService } from '@/client/services/ground.client-service';
import { AlertContext } from '@/client/contexts/alert.context';
import { useContext } from 'react';
import { GroundRerservationStatus } from '@/types/item/ground/ground-reservation.types';

interface Props {
	businessId?: string;
}

export default function ReservationFilters({ businessId }: Props) {
	const showAlert = useContext(AlertContext);

	const { register, watch, setValue } = useFormContext();
	const selectedGround = watch('ground');
	const selectedStatus = watch('status');

	const { data: groundOptions } = useFetch([], {
		async fetch() {
			try {
				if (!businessId) return [];

				const grounds = await GroundClientService.getPage({
					business: businessId,
				});
				return [
					{ value: 'all', label: 'All grounds' },
					...grounds.map(({ id, name }) => ({ value: id, label: name })),
				];
			} catch (error) {
				console.error(error);
				showAlert({ type: 'danger', message: 'Error while fetching grounds' });
				return [];
			}
		},
	});

	return (
		<>
			{businessId && (
				<Select
					{...register('ground')}
					value={selectedGround}
					onChange={(value) => setValue('ground', value)}
					placeholder='Select a ground'
					options={groundOptions}
				/>
			)}
			<Buttons
				className='overflow-x-auto -mx-4 px-4'
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
