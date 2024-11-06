'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Card from '@/components/utils/Card';
import ReservationFilters from '@/components/ground/reservation/ReservationFilters';
import ReservationsTable from '@/components/ground/reservation/ReservationsTable';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';
import Button from '@/components/utils/Button';
import { useToggler } from '@/client/hooks/utils/useToggler';
import withAuth from '@/client/hocs/withAuth.hoc';

function ReservationsPage() {
	const [user] = useContext(UserContext);
	const methods = useForm({ defaultValues: { ground: 'all', status: 'all' } });
	const [reload, toggleReload] = useToggler();

	return (
		<Card
			title='Reservations'
			titleSuffix={<Button icon='reload' onClick={toggleReload} />}
			bodyClassName='space-y-3'
		>
			<FormProvider {...methods}>
				<ReservationFilters />
				<ReservationsTable userId={user!.id} reload={reload} />
			</FormProvider>
		</Card>
	);
}

export default withAuth(ReservationsPage);
