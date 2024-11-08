'use client';

import Card from '@/components/utils/Card';
import Button from '@/components/utils/Button';
import withAuth from '@/client/hocs/withAuth.hoc';
import { Table } from '@/components/utils/table/Table';

function Page() {
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
			bodyClassName='space-y-3'
		>
			<Table
				headers={[
					{
						display: 'Name',
						field: 'name',
					},
					{
						display: 'Email',
						field: 'email',
					},
					{
						display: 'Phone',
						field: 'phone',
					},
					{
						display: 'Address',
						field: 'address',
					},
					{
						display: 'Actions',
						field: 'actions',
					},
				]}
				data={[]}
			/>
		</Card>
	);
}

export default withAuth(Page);
