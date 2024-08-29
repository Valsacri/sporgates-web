'use client';

import GroundReservationCard from '@/components/ground/GroundReservationCard';
import Buttons from '@/components/profile/Buttons';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Select } from '@/components/utils/form/Select';
import { GROUNDS } from '@/data/grounds';
import { GroundReservationDtoType } from '@/dtos/item/ground.dto';
import {
	GroundRerservationStatus,
	GroundReservation,
} from '@/types/item/ground.types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RESERVATIONS = [
	{
		ground: '66cc5cf50937e343f1de86cc',
		user: '66c65187f00ea05ffef7aaf2',
		dateTimeframes: {
			date: new Date().getTime(),
			timeframes: [
				{
					from: {
						hours: 10,
						minutes: 0,
					},
					to: {
						hours: 12,
						minutes: 0,
					},
				},
			],
		},
		totalPrice: 100,
		status: GroundRerservationStatus.PENDING,
	},
	{
		ground: '66cc5cf50937e343f1de86cc',
		user: '66c65187f00ea05ffef7aaf2',
		dateTimeframes: {
			date: new Date().getTime(),
			timeframes: [
				{
					from: {
						hours: 10,
						minutes: 0,
					},
					to: {
						hours: 12,
						minutes: 0,
					},
				},
			],
		},
		totalPrice: 200,
		status: GroundRerservationStatus.ACCEPTED,
	},
	{
		ground: '66cc5cf50937e343f1de86cc',
		user: '66c65187f00ea05ffef7aaf2',
		dateTimeframes: {
			date: new Date().getTime(),
			timeframes: [
				{
					from: {
						hours: 10,
						minutes: 0,
					},
					to: {
						hours: 12,
						minutes: 0,
					},
				},
			],
		},
		totalPrice: 300,
		status: GroundRerservationStatus.REJECTED,
	},
	{
		ground: '66cc5cf50937e343f1de86cc',
		user: '66c65187f00ea05ffef7aaf2',
		dateTimeframes: {
			date: new Date().getTime(),
			timeframes: [
				{
					from: {
						hours: 10,
						minutes: 0,
					},
					to: {
						hours: 12,
						minutes: 0,
					},
				},
			],
		},
		totalPrice: 400,
		status: GroundRerservationStatus.CANCELLED,
	},
] as GroundReservation[];

function Page() {
	const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			ground: '',
		},
	});

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

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				{RESERVATIONS.map((reservation, index) => (
					<GroundReservationCard key={index} reservation={reservation} />
				))}
			</div>
		</div>
	);
}

export default Page;
