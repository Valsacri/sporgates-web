'use client';

import { Table } from '@/components/utils/table/Table';
import { TableAction } from '@/components/utils/table/table.types';
import {
	GroundReservation,
	GroundRerservationStatus,
} from '@/types/item/ground/ground-reservation.types';
import { TimeHelper } from '@/helpers/datetime/time.helpers';
import { TimeframeHelper } from '@/helpers/datetime/timeframe.helpers';
import Loader from '@/components/utils/Loader';
import { useContext, useState } from 'react';
import { GroundReservationClientService } from '@/client/services/ground-reservation.client-service';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { useFormContext } from 'react-hook-form';
import { AlertContext } from '@/client/contexts/alert.context';
import { Ground } from '@/types/item/ground/ground.types';
import { User } from '@/types/user.types';
import Link from 'next/link';
import Status from '@/components/utils/Status';
import { Business } from '@/types/business.types';

interface Props {
	userId?: string;
	businessId?: string;
	reload: boolean;
}

export default function ReservationsTable({
	userId,
	businessId,
	reload,
}: Props) {
	const showAlert = useContext(AlertContext);

	const { watch } = useFormContext();

	const selectedGround = watch('ground');
	const selectedStatus = watch('status') as 'all' | GroundRerservationStatus;

	const [loadingActionIndex, setLoadingActionIndex] = useState(-1);

	const {
		data: reservations,
		loading,
		refetch,
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

	const handleUpdateStatus = async (
		reservation: GroundReservation,
		status: GroundRerservationStatus,
		index: number
	) => {
		try {
			setLoadingActionIndex(index);
			await GroundReservationClientService.updateStatus(reservation.id, status);
			refetch();
		} finally {
			setLoadingActionIndex(-1);
		}
	};

	return (
		<Table
			headers={[
				{
					field: (row) => `#${row.ref}`,
					display: 'Ref',
				},
				{
					field: (row) => (
						<Link
							href={`/grounds/${(row.ground as Ground).id}`}
							className='underline'
						>
							{(row.ground as Ground).name}
						</Link>
					),
					display: 'Ground',
				},
				businessId
					? {
							field: (row) => (
								<Link
									href={`/users/${(row.user as User).id}`}
									className='underline'
								>
									{(row.user as User).firstName} {(row.user as User).lastName}
								</Link>
							),
							display: 'User',
					  }
					: {
							field: (row) => (
								<Link
									href={`/businesses/${(row.business as Business).id}`}
									className='underline'
								>
									{(row.business as Business).name}
								</Link>
							),
							display: 'Business',
					  },
				{
					field: (row) => {
						const isOngoing =
							row.status === GroundRerservationStatus.ACCEPTED &&
							TimeframeHelper.isNow(row.timeframe);
						const status = isOngoing ? 'ongoing' : row.status;

						return <Status status={status} />;
					},
					display: 'Status',
				},
				{ field: (row) => row.totalPrice, display: 'Price' },
				{
					field: (row) => new Date(row.date).toLocaleString('fr-FR'),
					display: 'Reserved on',
				},
				{
					field: (row) => (
						<span className='text-nowrap'>
							{TimeframeHelper.format(row.timeframe)}
						</span>
					),
					display: 'Timeframe',
				},
				{
					field: (row) =>
						TimeHelper.formatDuration(
							TimeframeHelper.toDuration(row.timeframe)
						),
					display: 'Duration',
				},
			]}
			data={reservations}
			actions={(row, index) => {
				if (loadingActionIndex === index) {
					return [{ name: <Loader className='ml-auto' /> }];
				}

				const actions: TableAction<GroundReservation>[] = [];
				if (row.status === GroundRerservationStatus.PENDING) {
					actions.push(
						{
							name: 'Accept',
							callback: () =>
								handleUpdateStatus(
									row,
									GroundRerservationStatus.ACCEPTED,
									index
								),
						},
						{
							name: 'Reject',
							callback: () =>
								handleUpdateStatus(
									row,
									GroundRerservationStatus.REJECTED,
									index
								),
						}
					);
				} else if (row.status === GroundRerservationStatus.ACCEPTED) {
					actions.push({
						name: 'Cancel',
						callback: () =>
							handleUpdateStatus(
								row,
								GroundRerservationStatus.CANCELLED,
								index
							),
					});
				} else if (
					row.status === GroundRerservationStatus.REJECTED ||
					row.status === GroundRerservationStatus.CANCELLED
				) {
					actions.push({
						name: 'Accept',
						callback: () =>
							handleUpdateStatus(row, GroundRerservationStatus.ACCEPTED, index),
					});
				}

				return actions;
			}}
			loading={loading}
		/>
	);
}
