'use client';

import { GroundReservationClientService } from '@/client/services/ground-reservation.client-service';
import Buttons from '@/components/profile/Buttons';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Select } from '@/components/utils/form/Select';
import { Table } from '@/components/utils/table/Table';
import { GROUNDS } from '@/data/grounds';
import { formatTimeframe } from '@/helpers/datetime.helpers';
import {
	Ground,
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground.types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// const RESERVATIONS = [
// 	{
// 		ground: '66cc5cf50937e343f1de86cc',
// 		user: '66c65187f00ea05ffef7aaf2',
// 		date: new Date().getTime(),
// 		timeframe: {
// 			start: {
// 				hours: 10,
// 				minutes: 0,
// 			},
// 			end: {
// 				hours: 12,
// 				minutes: 0,
// 			},
// 		},
// 		totalPrice: 100,
// 		status: GroundRerservationStatus.PENDING,
// 	},
// 	{
// 		ground: '66cc5cf50937e343f1de86cc',
// 		user: '66c65187f00ea05ffef7aaf2',
// 		date: new Date().getTime(),
// 		timeframe: {
// 			start: {
// 				hours: 10,
// 				minutes: 0,
// 			},
// 			end: {
// 				hours: 12,
// 				minutes: 0,
// 			},
// 		},
// 		totalPrice: 200,
// 		status: GroundRerservationStatus.ACCEPTED,
// 	},
// 	{
// 		ground: '66cc5cf50937e343f1de86cc',
// 		user: '66c65187f00ea05ffef7aaf2',
// 		date: new Date().getTime(),
// 		timeframe: {
// 			start: {
// 				hours: 10,
// 				minutes: 0,
// 			},
// 			end: {
// 				hours: 12,
// 				minutes: 0,
// 			},
// 		},
// 		totalPrice: 300,
// 		status: GroundRerservationStatus.REJECTED,
// 	},
// 	{
// 		ground: '66cc5cf50937e343f1de86cc',
// 		user: '66c65187f00ea05ffef7aaf2',
// 		date: new Date().getTime(),
// 		timeframe: {
// 			start: {
// 				hours: 10,
// 				minutes: 0,
// 			},
// 			end: {
// 				hours: 12,
// 				minutes: 0,
// 			},
// 		},
// 		totalPrice: 400,
// 		status: GroundRerservationStatus.CANCELLED,
// 	},
// ] as GroundReservation[];

function Page() {
	const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

	const [reservations, setReservations] = useState<GroundReservation[]>([]);

	const { handleSubmit, register, reset, watch, setValue } = useForm({
		defaultValues: {
			ground: '',
		},
	});

	const handleUpdateReservationStatus = (
		index: number,
		status: GroundRerservationStatus
	) => {
		const newReservations = [...reservations];
		newReservations[index].status = status;
		setReservations(newReservations);
	};

	useEffect(() => {
		const fetchReservations = async () => {
			const res = await GroundReservationClientService.getAll();
			setReservations(res);
		};
		fetchReservations();
	}, []);

	const groundOptions = GROUNDS.map((ground) => ({
		value: ground.id,
		label: ground.name,
	}));

	return (
		<div className='space-y-5'>
			<Card title='Reservations' className='space-y-5'>
				See your pending reservations
				<div className='grid grid-cols-12 gap-5 items-end'>
					<Select
						{...register('ground')}
						value={watch('ground')}
						onChange={(value) => setValue('ground', value)}
						label='Ground'
						placeholder='Select a ground'
						options={groundOptions}
						className='col-span-4'
					/>
					<Buttons
						containerClassName='col-span-5'
						color='secondary'
						items={[
							{
								text: 'Pending',
							},
							{
								text: 'Accepted',
							},
							{
								text: 'Rejected',
							},
							{
								text: 'Ongoing',
							},
							{
								text: 'Canceled',
							},
						].map(
							(item, i) =>
								({
									...item,
									onClick: () => setSelectedTypeIndex(i),
									selected: selectedTypeIndex === i,
								} as any)
						)}
					/>
					<Button type='submit' color='primary' className='col-span-3'>
						Search
					</Button>
				</div>
			</Card>

			<Card title='Reservations'>
				<Table
					headers={[
						{ field: row => (row.ground as Ground).name, display: 'Ground' },
						{ field: 'status', display: 'Status' },
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
					actions={[
						{
							name: 'Accept',
							callback: (_, index) =>
								handleUpdateReservationStatus(
									index,
									GroundRerservationStatus.ACCEPTED
								),
						},
						{
							name: 'Reject',
							callback: (_, index) =>
								handleUpdateReservationStatus(
									index,
									GroundRerservationStatus.REJECTED
								),
						},
					]}
				/>
			</Card>
		</div>
	);
}

export default Page;
