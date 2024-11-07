'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Card from '@/components/utils/Card';
import ReservationFilters from '@/components/ground/reservation/ReservationFilters';
import ReservationsList from '@/components/ground/reservation/ReservationsTable';
import Button from '@/components/utils/Button';
import { useToggler } from '@/client/hooks/utils/useToggler';

interface Props {
	params: { businessId: string };
}

export default function Page({ params }: Props) {
	const methods = useForm({
		defaultValues: { ground: 'all', status: 'all' },
	});
	const [reload, toggleReload] = useToggler();

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
				<Card title='Filters' className='h-max' bodyClassName='space-y-3'>
					<ReservationFilters businessId={params.businessId} />
				</Card>
				<Card
					title='Reservations'
					titleSuffix={<Button icon='reload' onClick={toggleReload} />}
				>
					<ReservationsList businessId={params.businessId} reload={reload} />
				</Card>
			</div>
		</FormProvider>
	);
}
