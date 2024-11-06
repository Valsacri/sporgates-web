'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Card from '@/components/utils/Card';
import ReservationFilters from '@/components/ground/reservation/ReservationFilters';
import ReservationsTable from '@/components/ground/reservation/ReservationsTable';
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
		<Card
			title='Reservations'
			bodyClassName='space-y-3'
			titleSuffix={<Button icon='reload' onClick={toggleReload} />}
		>
			<FormProvider {...methods}>
				<ReservationFilters businessId={params.businessId} />
				<ReservationsTable businessId={params.businessId} reload={reload} />
			</FormProvider>
		</Card>
	);
}
