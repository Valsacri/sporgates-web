'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Card from '@/components/utils/Card';
import ReservationFilters from '@/components/ground/reservation/ReservationFilters';
import ReservationsTable from '@/components/ground/reservation/ReservationsTable';

interface Props {
	params: { businessId: string };
}

export default function ReservationsPage({ params }: Props) {
	const methods = useForm({ defaultValues: { ground: 'all', status: 'all' } });

	return (
		<div className='space-y-5'>
			<Card title='Reservations' className='space-y-5'>
				<FormProvider {...methods}>
					<ReservationFilters businessId={params.businessId} />
					<ReservationsTable businessId={params.businessId} />
				</FormProvider>
			</Card>
		</div>
	);
}
