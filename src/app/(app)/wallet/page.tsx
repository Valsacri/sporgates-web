'use client';

import { useFetch } from '@/client/hooks/utils/useFetch';
import { TransactionClientService } from '@/client/services/transaction.client-service';
import Balance from '@/components/shared/Balance';
import Card from '@/components/utils/Card';
import { Table } from '@/components/utils/table/Table';
import { Club, ClubSubscription } from '@/types/item/club.types';
import { Ground, GroundReservation } from '@/types/item/ground.types';
import { Transaction, TransactionSubject } from '@/types/wallet.types';

function Page() {
	const {
		data: transactions,
		loading: loadingTransactions,
		refetch: refetchTransactions,
	} = useFetch([], {
		async fetch() {
			return await TransactionClientService.getPage();
		},
	});

	const getCounterpart = (transaction: Transaction) => {
		if (transaction.subject === TransactionSubject.DEPOSIT) {
			return 'Sporgates';
		}

		if (transaction.subject === TransactionSubject.GROUND_RESERVATION_REFUND) {
			const reservation =
				transaction.refundGroundReservation as GroundReservation;
			const ground = reservation.ground as Ground;
			return ground.name;
		}

		if (transaction.subject === TransactionSubject.CLUB_SUBSCRIPTION_REFUND) {
			const subscription =
				transaction.refundClubSubscription as ClubSubscription;
			const club = subscription.club as Club;
			return club.name;
		}
	};

	return (
		<div className='grid grid-cols-12 gap-5'>
			<Card
				className='col-span-12 text-3xl'
				title={<h1 className='text-3xl'>Wallet</h1>}
			></Card>

			<Card title='Transactions' className='col-span-8'>
				<Table
					headers={[
						{
							field: (row) => new Date(row.createdAt).toLocaleString('fr-FR'),
							display: 'Date',
						},
						{
							field: 'subject',
							display: 'Subject',
						},
						{
							field: getCounterpart,
							display: 'Counterpart',
						},
						{ field: 'amount', display: 'Amount' },
					]}
					data={transactions}
					loading={loadingTransactions}
				/>
			</Card>

			<Card className='col-span-4 h-min'>
				<Balance onDeposit={refetchTransactions} />
			</Card>

			{/* <Card title='Filter transactions' className='col-span-8'></Card> */}
		</div>
	);
}

export default Page;
