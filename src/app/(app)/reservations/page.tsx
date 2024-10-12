'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { GroundReservationClientService } from '@/client/services/ground-reservation.client-service';
import { GroundClientService } from '@/client/services/ground.client-service';
import Buttons, { ButtonItem } from '@/components/profile/Buttons';
import Card from '@/components/utils/Card';
import { Select, SelectOption } from '@/components/utils/form/Select';
import Loader from '@/components/utils/Loader';
import { Table } from '@/components/utils/table/Table';
import { TableAction } from '@/components/utils/table/table.types';
import { formatTimeframe } from '@/helpers/datetime.helpers';
import {
	Ground,
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground.types';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

function Page() {
	const [selectedStatus, setSelectedStatus] = useState<
		GroundRerservationStatus | 'all'
	>('all');

	const [loadingActionIndex, setLoadingActionIndex] = useState(-1);

	const showAlert = useContext(AlertContext);

	const { handleSubmit, register, reset, watch, setValue } = useForm({
		defaultValues: {
			ground: 'all',
		} as { ground: string },
	});

	const ground = watch('ground');

	const { data: grounds } = useFetch(
		[],
		{
			async fetch() {
				try {
					const grounds = await GroundClientService.getAll();
					return grounds;
				} catch (error) {
					console.log(error);
					showAlert({
						color: 'danger',
						message: 'Error while fetching grounds',
					});
					return [];
				}
			},
		},
		[]
	);

	const {
		data: reservations,
		loading,
		refetch,
	} = useFetch(
		[],
		{
			async fetch() {
				try {
					const reservations = await GroundReservationClientService.getAll(
						ground,
						selectedStatus === 'all' ? null : selectedStatus
					);
					return reservations;
				} catch (error) {
					console.log(error);
					showAlert({
						color: 'danger',
						message: 'Error while fetching reservations',
					});
					return [];
				}
			},
		},
		[ground, selectedStatus]
	);

	const groundOptions: SelectOption[] = [
		{
			value: 'all',
			label: 'All',
		},
		...grounds.map((ground) => ({
			value: ground.id,
			label: ground.name,
		})),
	];

	const handleUpdateStatus = async (
		reservation: GroundReservation,
		status: GroundRerservationStatus,
		index: number
	) => {
		try {
			setLoadingActionIndex(index);
			await GroundReservationClientService.updateStatus(reservation.id, status);
			refetch();
		} catch (e) {
		} finally {
			setLoadingActionIndex(-1);
		}
	};

	return (
		<div className='space-y-5'>
			<Card title='Reservations' className='space-y-5'>
				See your pending reservations
				<div className='grid grid-cols-12 gap-5 items-end'>
					<Select
						{...register('ground')}
						value={ground}
						onChange={(value) => setValue('ground', value)}
						label='Ground'
						placeholder='Select a ground'
						options={groundOptions}
						className='col-span-12 sm:col-span-4'
					/>
					<Buttons
						containerClassName='col-span-12 sm:col-span-8'
						color='secondary'
						items={(
							[
								{
									text: 'All',
									value: 'all',
								},
								{
									text: 'Pending',
									value: 'pending',
								},
								{
									text: 'Accepted',
									value: 'accepted',
								},
								{
									text: 'Rejected',
									value: 'rejected',
								},
								{
									text: 'Ongoing',
									value: 'ongoing',
								},
								{
									text: 'Cancelled',
									value: 'cancelled',
								},
							] as { text: string; value: GroundRerservationStatus }[]
						).map(
							(item) =>
								({
									text: item.text,
									onClick: () => setSelectedStatus(item.value),
									selected: selectedStatus === item.value,
								} as ButtonItem)
						)}
					/>
				</div>
			</Card>

			<Card title='Reservations'>
				<Table
					headers={[
						{ field: (row) => (row.ground as Ground).name, display: 'Ground' },
						{
							field: (row) => <div className='capitalize'>{row.status}</div>,
							display: 'Status',
						},
						{ field: 'totalPrice', display: 'Total Price' },
						{
							field: (row) => new Date(row.date).toLocaleDateString('fr-FR'),
							display: 'Date',
						},
						{
							field: (row) => formatTimeframe(row.timeframe),
							display: 'Timeframe',
						},
					]}
					data={reservations || []}
					actions={(row, index) => {
						let actions: TableAction<GroundReservation>[] = [];

						if (loadingActionIndex === index) {
							return [
								{
									name: <Loader />,
								},
							];
						}

						if (row.status === GroundRerservationStatus.PENDING) {
							actions = [
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
								},
							];
						} else if (row.status === GroundRerservationStatus.ACCEPTED) {
							actions = [
								{
									name: 'Cancel',
									callback: () =>
										handleUpdateStatus(
											row,
											GroundRerservationStatus.CANCELLED,
											index
										),
								},
							];
						}

						return actions;
					}}
					loading={loading}
				/>
			</Card>
		</div>
	);
}

export default Page;
