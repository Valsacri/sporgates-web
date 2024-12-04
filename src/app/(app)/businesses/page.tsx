'use client';

import Card from '@/components/utils/Card';
import withAuth from '@/client/hocs/withAuth.hoc';
import { Table } from '@/components/utils/table/Table';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { BusinessClientService } from '@/client/services/business.client-service';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';
import Icon from '@/components/utils/Icon';
import CreateBusinessForm from '@/components/business/CreateBusinessForm';
import Button from '@/components/utils/Button';
import { AlertContext } from '@/client/contexts/alert.context';
import { User } from '@/types/user.types';
import ConfirmationPopup from '@/components/shared/ConfirmationPopup';
import Link from 'next/link';
import { Popup } from '@/components/utils/Popup';

function Page() {
	const [user] = useContext(UserContext);
	const showAlert = useContext(AlertContext);

	const {
		data: [ownedBusinesses, otherBusinesses],
		loading,
	} = useFetch([], {
		async fetch() {
			try {
				const businesses = await BusinessClientService.getAll({
					staff: user?.id,
				});
				const ownedBusinesses = businesses.filter(
					(b) => (b.owner as User).id === user!.id
				);
				const otherBusinesses = businesses.filter(
					(b) => (b.owner as User).id !== user!.id
				);
				return [ownedBusinesses, otherBusinesses];
			} catch (error) {
				console.error(error);
				showAlert({
					type: 'danger',
					message: 'Failed to fetch businesses',
				});
				return [[], []];
			}
		},
	});

	const handleDelete = async (business: any) => {
		try {
			await BusinessClientService.delete(business.id);
			showAlert({
				type: 'success',
				message: 'Business deleted successfully',
			});
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
				message: 'Failed to delete business',
			});
		}
	};

	const handleLeave = async (business: any) => {
		try {
			await BusinessClientService.removeStaff(business.id, user!.id);
			showAlert({
				type: 'success',
				message: 'Left business successfully',
			});
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
				message: 'Failed to leave business',
			});
		}
	};

	return (
		<div className='w-full lg:w-[600px] mx-auto space-y-3'>
			<Card
				title='Owned businesses'
				titleSuffix={
					<Popup
						title='Create a business'
						description='Fill in the details to create a new business.'
						trigger={<Button icon='add'></Button>}
					>
						<CreateBusinessForm />
					</Popup>
				}
				bodyClassName='space-y-3 overflow-visible'
			>
				<Table
					headers={[
						{
							display: 'Name',
							field: (row) => (
								<Link className='underline' href={`/businesses/${row.id}`}>
									{row.name}
								</Link>
							),
						},
						{
							display: 'Username',
							field: 'username',
						},
						{
							display: 'Staff',
							field: (row) => row.staff.length,
						},
					]}
					data={ownedBusinesses}
					loading={loading}
					actions={[
						{
							name: (row) => (
								<Popup
									title='Update business'
									description='Fill in the details to update the business.'
									trigger={
										<div className='flex items-center gap-2'>
											<Icon name='edit' /> Edit
										</div>
									}
								>
									<CreateBusinessForm business={row} />
								</Popup>
							),
						},
						{
							name: (row) => (
								<ConfirmationPopup onConfirm={() => handleDelete(row)}>
									<div className='flex items-center gap-2'>
										<Icon name='trash' /> Delete
									</div>
								</ConfirmationPopup>
							),
						},
					]}
				/>
			</Card>

			<Card title='Businesses' bodyClassName='space-y-3 overflow-visible'>
				<Table
					headers={[
						{
							display: 'Name',
							field: (row) => (
								<Link className='underline' href={`/businesses/${row.id}`}>
									{row.name}
								</Link>
							),
						},
						{
							display: 'Username',
							field: 'username',
						},
						{
							display: 'Owner',
							field: (row) => (
								<Link
									className='underline'
									href={`/users/${(row.owner as User).id}`}
								>
									{(row.owner as User).name}
								</Link>
							),
						},
					]}
					data={otherBusinesses}
					loading={loading}
					actions={[
						{
							name: (row) => (
								<div className='flex items-center gap-2'>
									<Icon name='trash' /> Leave
								</div>
							),
							callback: (business) => handleLeave(business),
						},
					]}
				/>
			</Card>
		</div>
	);
}

export default withAuth(Page);
