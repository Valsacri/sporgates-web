'use client';

import {
	GroundRerservationStatus
} from '@/types/item/ground/ground-reservation.types';
import Loader from '@/components/utils/Loader';
import { useContext } from 'react';
import { GroundReservationClientService } from '@/client/services/ground-reservation.client-service';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { useFormContext } from 'react-hook-form';
import { AlertContext } from '@/client/contexts/alert.context';
import ReservationCard from './ReservationCard';

interface Props {
	userId?: string;
	businessId?: string;
	reload: boolean;
}

export default function ReservationsList({
	userId,
	businessId,
	reload,
}: Props) {
	const showAlert = useContext(AlertContext);

	const { watch } = useFormContext();

	const selectedGround = watch('ground');
	const selectedStatus = watch('status') as 'all' | GroundRerservationStatus;

	const {
		data: reservations,
		loading,
	} = useFetch(
		[],
		{
			async fetch() {
				try {
					return await GroundReservationClientService.getAll({
						user: userId,
						business: businessId,
						ground: selectedGround === 'all' ? undefined : selectedGround,
						status: selectedStatus === 'all' ? undefined : selectedStatus,
					});
				} catch (error) {
					console.error(error);
					showAlert({
						color: 'danger',
						message: 'Error while fetching reservations',
					});
					return [];
				}
			},
		},
		[selectedGround, selectedStatus, reload]
	);

	if (loading) return <Loader className='size-10 mx-auto' />;

	return (
		<div className='space-y-3'>
			{reservations.map((row) => (
				<ReservationCard key={row.ref} reservation={row} />
			))}
		</div>
	);
}
