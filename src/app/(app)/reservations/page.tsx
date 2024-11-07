'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Card from '@/components/utils/Card';
import ReservationFilters from '@/components/ground/reservation/ReservationFilters';
import ReservationsList from '@/components/ground/reservation/ReservationsTable';
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
		<FormProvider {...methods}>
			<div className='w-full lg:w-[600px] mx-auto grid grid-cols-1 md:grid-cols-22 gap-3'>
				{/* <Card title='Filters' bodyClassName='space-y-3' className='h-min'>
					<ReservationFilters />
				</Card> */}

				<Card
					title='Reservations'
					titleSuffix={<Button icon='reload' onClick={toggleReload} />}
					bodyClassName='space-y-3'
				>
					<ReservationFilters />
					<ReservationsList userId={user!.id} reload={reload} />
				</Card>
			</div>
		</FormProvider>
	);
}

export default withAuth(ReservationsPage);
