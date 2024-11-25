'use client';

import Card from '@/components/utils/Card';
import withAuth from '@/client/hocs/withAuth.hoc';
import { Table } from '@/components/utils/table/Table';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { BusinessClientService } from '@/client/services/business.client-service';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';
import Icon from '@/components/utils/Icon';
import BusinessFormPopup from '@/components/business/BusinessFormPopup';
import Button from '@/components/utils/Button';
import { AlertContext } from '@/client/contexts/alert.context';
import { User } from '@/types/user.types';
import ConfirmationPopup from '@/components/shared/ConfirmationPopup';
import Link from 'next/link';

function Page() {
	const [user] = useContext(UserContext);
	const showAlert = useContext(AlertContext);

	const { data: businesses, loading } = useFetch([], {
		async fetch() {
			try {
				return await BusinessClientService.getAll({ owner: user?.id });
			} catch (error) {
				console.error(error);
				showAlert({
					type: 'danger',
					message: 'Failed to fetch businesses',
				});
				return [];
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
					<BusinessFormPopup>
						<Button icon='add'></Button>
					</BusinessFormPopup>
				}
				bodyClassName='space-y-3 overflow-visible'
			>
				<Table
					headers={[
						{
							display: 'Name',
							field: 'name',
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
					data={businesses}
					loading={loading}
					actions={[
						{
							name: (row) => (
								<BusinessFormPopup business={row}>
									<div className='flex items-center gap-2'>
										<Icon name='edit' /> Edit
									</div>
								</BusinessFormPopup>
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
							callback: (business) => handleDelete(business),
						},
					]}
				/>
			</Card>

			<Card title='Businesses' bodyClassName='space-y-3 overflow-visible'>
				<Table
					headers={[
						{
							display: 'Name',
							field: 'name',
						},
						{
							display: 'Username',
							field: 'username',
						},
						{
							display: 'Owner',
							field: (row) => (
								<Link className='underline' href={(row.owner as User).id}>
									{(row.owner as User).name}
								</Link>
							),
						},
					]}
					data={businesses}
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
