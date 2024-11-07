'use client';

import Link from 'next/link';
import {
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground/ground-reservation.types';
import { TimeframeHelper } from '@/helpers/datetime/timeframe.helpers';
import { TimeHelper } from '@/helpers/datetime/time.helpers';
import { User } from '@/types/user.types';
import { Business } from '@/types/business.types';
import { Ground } from '@/types/item/ground/ground.types';
import Icon from '@/components/utils/Icon';
import { DateHelper } from '@/helpers/datetime/date.helpers';
import Card from '@/components/utils/Card';
import Status from '@/components/utils/Status';
import Dropdown from '@/components/utils/Dropdown';
import List2 from '@/components/utils/List2';
import ListItem, { ListItemProps } from '@/components/utils/ListItem';
import { twMerge } from 'tailwind-merge';
import { statusMap } from '@/constants';
import { useEffect, useMemo, useState } from 'react';
import { GroundReservationClientService } from '@/client/services/ground-reservation.client-service';
import Loader from '@/components/utils/Loader';

interface CardProps {
	reservation: GroundReservation;
	businessId?: boolean;
}

function ReservationCard({ reservation, businessId }: CardProps) {
	const [loadingAction, setLoadingAction] = useState(false);
	const [status, setStatus] = useState<GroundRerservationStatus | null>(null);

	const handleUpdateStatus = async (status: GroundRerservationStatus) => {
		try {
			setLoadingAction(true);
			const { status: newStatus } =
				await GroundReservationClientService.updateStatus(
					reservation.id,
					status
				);
			setStatus(newStatus);
		} finally {
			setLoadingAction(false);
		}
	};

	useEffect(() => {
		const isOngoing =
			reservation.status === GroundRerservationStatus.ACCEPTED &&
			TimeframeHelper.isNow(reservation.timeframe);
		const status = isOngoing
			? GroundRerservationStatus.ONGOING
			: reservation.status;

		setStatus(status);
	}, [reservation.status]);

	const actions: ListItemProps[] = useMemo(() => {
		if (status === GroundRerservationStatus.PENDING) {
			return [
				{
					children: 'Accept',
					onClick: () => handleUpdateStatus(GroundRerservationStatus.ACCEPTED),
					className: statusMap[GroundRerservationStatus.ACCEPTED].textClassName,
				},
				{
					children: 'Decline',
					onClick: () => handleUpdateStatus(GroundRerservationStatus.REJECTED),
					className: statusMap[GroundRerservationStatus.REJECTED].textClassName,
				},
			];
		}
		if (status === GroundRerservationStatus.ACCEPTED) {
			return [
				{
					children: 'Cancel',
					onClick: () => handleUpdateStatus(GroundRerservationStatus.CANCELLED),
					className:
						statusMap[GroundRerservationStatus.CANCELLED].textClassName,
				},
			];
		}
		if (
			status === GroundRerservationStatus.REJECTED ||
			status === GroundRerservationStatus.CANCELLED
		) {
			return [
				{
					children: 'Accept',
					onClick: () => handleUpdateStatus(GroundRerservationStatus.ACCEPTED),
					className: statusMap[GroundRerservationStatus.ACCEPTED].textClassName,
				},
			];
		}
		return [];
	}, [status]);

	return (
		<Dropdown
			yPosition='top'
			yInside
			className='mt-1 mr-1'
			closeOnClick
			trigger={
				<Card bodyClassName='flex justify-between text-text-secondary-dark text-sm cursor-pointer group'>
					<div className='flex flex-col gap-3'>
						<div>
							<div className='flex items-center gap-1'>
								<Icon name='location' />
								<h4>
									<Link
										href={`/grounds/${(reservation.ground as Ground).id}`}
										className='hover:underline'
									>
										{(reservation.ground as Ground).name}
									</Link>
								</h4>
							</div>
							<span className='ml-7'>
								{businessId ? (
									<Link
										href={`/users/${(reservation.user as User).id}`}
										className='underline'
									>
										{(reservation.user as User).name}
									</Link>
								) : (
									<Link
										href={`/businesses/${
											(reservation.business as Business).id
										}`}
										className='hover:underline'
									>
										{(reservation.business as Business).name}
									</Link>
								)}
							</span>
						</div>
						<div className='flex items-center gap-1'>
							<Icon name='user' />
							<h4>
								<Link
									href={`/users/${(reservation.user as User).id}`}
									className='hover:underline'
								>
									{(reservation.user as User).name}
								</Link>
							</h4>
						</div>
						<div className='flex items-center gap-1'>
							<Icon name='edit2' />
							<span>
								{DateHelper.formatDate(new Date(reservation.createdAt))}
							</span>
						</div>
					</div>
					<div className='flex flex-col items-end gap-2'>
						{loadingAction ? (
							<Loader className='mb-2' />
						) : (
							<Status
								status={status}
								className='mb-2 group-hover:scale-110 transition-all duration-50'
							/>
						)}
						<div className='flex items-center gap-1'>
							<span>{DateHelper.formatDate(new Date(reservation.date))}</span>
							<Icon name='calendar' />
						</div>
						<div className='flex items-center gap-1'>
							{TimeframeHelper.format(reservation.timeframe)}
							<Icon name='clock' />
						</div>
						<div className='flex items-center gap-1'>
							{TimeHelper.formatDuration(
								TimeframeHelper.toDuration(reservation.timeframe)
							)}
							<Icon name='clock' />
						</div>
						<div className='flex items-center gap-1'>
							{reservation.totalPrice} DH
							<Icon name='dollar' />
						</div>
					</div>
				</Card>
			}
		>
			{actions.length > 0 && (
				<List2 className='text-sm'>
					{actions.map((action, index) => (
						<ListItem key={index} {...action} containerClassName='py-1' />
					))}
				</List2>
			)}
		</Dropdown>
	);
}

export default ReservationCard;
