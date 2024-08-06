'use client';

import GroundCard from '@/components/ground/GroundCard';
import Buttons from '@/components/profile/Buttons';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/Input';
import { Select } from '@/components/utils/Select';
import { GROUNDS } from '@/data/grounds';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function page() {
	const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			keyword: '',
			city: 'all',
			neighborhood: 'all',
		},
	});

	return (
		<div className='space-y-5'>
			<Card title='Explore' className='space-y-5'>
				Search for champs, grounds, and more...
				<div className='grid grid-cols-12 gap-5'>
					<Input
						{...register('keyword')}
						placeholder='Search'
						className='col-span-4'
					/>
					<Select
						{...register('city')}
						placeholder='City'
						options={[
							{ value: 'all', label: 'All cities' },
							{ value: 'city1', label: 'City 1' },
							{ value: 'city2', label: 'City 2' },
						]}
						className='col-span-3'
					/>
					<Select
						{...register('neighborhood')}
						placeholder='Neighborhood'
						options={[
							{ value: 'all', label: 'All neighborhood' },
							{ value: 'neighborhood1', label: 'Neighborhood 1' },
							{ value: 'neighborhood2', label: 'Neighborhood 2' },
						]}
						className='col-span-3'
					/>
					<Button type='submit' color='primary' className='col-span-2'>
						Search
					</Button>
				</div>
				<Buttons
					color='secondary'
					items={[
						{
							icon: 'two-user',
							text: 'Champs',
						},
						{
							icon: 'location',
							text: 'Grounds',
						},
						{
							icon: 'two-user',
							text: 'Champs',
						},
						{
							icon: 'location',
							text: 'Grounds',
						},
						{
							icon: 'two-user',
							text: 'Champs',
						},
						{
							icon: 'location',
							text: 'Grounds',
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
			</Card>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				{GROUNDS.map((ground) => (
					<GroundCard key={ground.id} ground={ground} />
				))}
			</div>
		</div>
	);
}

export default page;
