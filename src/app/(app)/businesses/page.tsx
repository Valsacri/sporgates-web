'use client';

import Card from '@/components/utils/Card';
import withAuth from '@/client/hocs/withAuth.hoc';
import { Table } from '@/components/utils/table/Table';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { BusinessClientService } from '@/client/services/business.client-service';
import { useContext } from 'react';
import { UserContext } from '@/client/contexts/user.context';
import Icon from '@/components/utils/Icon';

function Page() {
	const [user] = useContext(UserContext);

	const { data: businesses, loading } = useFetch([], {
		async fetch() {
			return await BusinessClientService.getAll({ user: user?.id });
		},
	});

	return (
		<Card
			title='Businesses'
			titleSuffix={
				// <CreateBusinessFormPopup>
				// 	<Button icon='add' />
				// </CreateBusinessFormPopup>
				null
			}
			className='w-full lg:w-[600px] mx-auto grid grid-cols-1 md:grid-cols-22 gap-3'
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
						name: (
							<div className='flex items-center gap-2'>
								<Icon name='edit' /> Edit
							</div>
						),
						callback: (business) => console.log(business),
					},
					{
            name: (
              <div className='flex items-center gap-2'>
                <Icon name='trash' /> Delete
              </div>
            ),
						callback: (business) => console.log(business),
					},
				]}
			/>
		</Card>
	);
}

export default withAuth(Page);
