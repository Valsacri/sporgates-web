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
import { twMerge } from 'tailwind-merge';
import { HiCheck, HiMiniNoSymbol } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';
import { LuClock } from 'react-icons/lu';
import { TbPlayFootball } from 'react-icons/tb';
import { useContext, useState } from 'react';
import { GroundReservationClientService } from '@/client/services/ground-reservation.client-service';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { useFormContext } from 'react-hook-form';
import { AlertContext } from '@/client/contexts/alert.context';
import { Ground } from '@/types/item/ground/ground.types';
import { User } from '@/types/user.types';
import Link from 'next/link';

interface Props {
	businessId: string;
}

const statusMap = {
	ongoing: {
		textClassName: 'text-info',
		bgClassName: 'bg-info',
		text: 'Ongoing',
		icon: <TbPlayFootball className='size-5' />,
	},
	[GroundRerservationStatus.PENDING]: {
		textClassName: 'text-text-secondary',
		bgClassName: 'bg-text-secondary',
		text: 'Pending',
		icon: <LuClock className='size-4' />,
	},
	[GroundRerservationStatus.ACCEPTED]: {
		textClassName: 'text-success',
		bgClassName: 'bg-success',
		text: 'Accepted',
		icon: <HiCheck className='size-5' />,
	},
	[GroundRerservationStatus.REJECTED]: {
		textClassName: 'text-warning',
		bgClassName: 'bg-warning',
		text: 'Rejected',
		icon: <HiX className='size-5' />,
	},
	[GroundRerservationStatus.CANCELLED]: {
		textClassName: 'text-danger',
		bgClassName: 'bg-danger',
		text: 'Cancelled',
		icon: <HiMiniNoSymbol className='size-4' />,
	},
} as any;

export default function ReservationsTable({ businessId }: Props) {
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
		[selectedGround, selectedStatus]
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
				{
					field: (row) => (
						<Link
							href={`/users/${(row.user as User).id}`}
							className='underline'
						>
							{(row.user as User).firstName} {(row.user as User).lastName}
						</Link>
					),
					display: 'User',
				},
				{
					field: (row) => {
						const isOngoing =
							row.status === GroundRerservationStatus.ACCEPTED &&
							TimeframeHelper.isNow(row.timeframe);
						const status = isOngoing ? 'ongoing' : row.status;
						const statusData = statusMap[status];

						return (
							<div
								className={twMerge(
									'capitalize flex items-center gap-1.5',
									statusMap[status].textClassName
								)}
							>
								{/* {statusMap[status].icon}  */}
								<div
									className={twMerge(
										'rounded-full size-2',
										statusData.bgClassName
									)}
								/>
								{statusData.text}
							</div>
						);
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
					return [{ name: <Loader /> }];
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
