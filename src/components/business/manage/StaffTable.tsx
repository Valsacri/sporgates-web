'use client';

import { Table } from '@/components/utils/table/Table';
import { TableAction } from '@/components/utils/table/table.types';
import Loader from '@/components/utils/Loader';
import { twMerge } from 'tailwind-merge';
import { HiCheck, HiMiniNoSymbol } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';
import { LuClock } from 'react-icons/lu';
import { TbPlayFootball } from 'react-icons/tb';
import { User } from '@/types/user.types';

interface Props {
	staff: User[];
	loadingActionIndex: number;
	loading: boolean;
}

export default function StaffTable({
	staff,
	onUpdateStatus,
	loadingActionIndex,
	loading,
}: Props) {
	const statusMap = {
		ongoing: {
			className: 'text-info',
			text: 'Ongoing',
			icon: <TbPlayFootball className='size-5' />,
		},
		[GroundRerservationStatus.PENDING]: {
			className: 'text-text-secondary',
			text: 'Pending',
			icon: <LuClock className='size-4' />,
		},
		[GroundRerservationStatus.ACCEPTED]: {
			className: 'text-success',
			text: 'Accepted',
			icon: <HiCheck className='size-5' />,
		},
		[GroundRerservationStatus.REJECTED]: {
			className: 'text-warning',
			text: 'Rejected',
			icon: <HiX className='size-5' />,
		},
		[GroundRerservationStatus.CANCELLED]: {
			className: 'text-danger',
			text: 'Cancelled',
			icon: <HiMiniNoSymbol className='size-4' />,
		},
	} as any;

	return (
		<Table
			headers={[
				{
					field: (row) => (row.ground as Ground).name,
					display: 'Ground',
					minWidth: 150,
				},
				{
					field: (row) => {
						const isOngoing =
							row.status === GroundRerservationStatus.ACCEPTED &&
							TimeframeHelper.isNow(row.timeframe);
						const status = isOngoing ? 'ongoing' : row.status;

						return (
							<div
								className={twMerge(
									'capitalize flex items-center gap-1',
									statusMap[status].className
								)}
							>
								{statusMap[status].icon} {statusMap[status].text}
							</div>
						);
					},
					display: 'Status',
				},
				{ field: (row) => `${row.totalPrice} DH`, display: 'Price' },
				{
					field: (row) => new Date(row.date).toLocaleString('fr-FR'),
					display: 'Reserved on',
				},
				{
					field: (row) => TimeframeHelper.format(row.timeframe),
					display: 'Reserved for',
				},
				{
					field: (row) =>
						TimeHelper.formatDuration(
							TimeframeHelper.toDuration(row.timeframe)
						),
					display: 'Duration',
				},
			]}
			data={staff}
			actions={(row, index) => {
				if (loadingActionIndex === index) {
					return [{ name: <Loader /> }];
				}

				const actions: TableAction<GroundStaff>[] = [];
				if (row.status === GroundRerservationStatus.PENDING) {
					actions.push(
						{
							name: 'Accept',
							callback: () =>
								onUpdateStatus(row, GroundRerservationStatus.ACCEPTED, index),
						},
						{
							name: 'Reject',
							callback: () =>
								onUpdateStatus(row, GroundRerservationStatus.REJECTED, index),
						}
					);
				} else if (row.status === GroundRerservationStatus.ACCEPTED) {
					actions.push({
						name: 'Cancel',
						callback: () =>
							onUpdateStatus(row, GroundRerservationStatus.CANCELLED, index),
					});
				} else if (
					row.status === GroundRerservationStatus.REJECTED ||
					row.status === GroundRerservationStatus.CANCELLED
				) {
					actions.push({
						name: 'Accept',
						callback: () =>
							onUpdateStatus(row, GroundRerservationStatus.ACCEPTED, index),
					});
				}

				return actions;
			}}
			loading={loading}
		/>
	);
}
