'use client';

import { useContext } from 'react';
import Card from '@/components/utils/Card';
import UpdateBusinessProfileForm from '@/components/business/UpdateBusinessProfileForm';
import { BusinessContext } from '@/client/contexts/business.context';

function Page() {
	const business = useContext(BusinessContext);

	return (
		<Card title='Business settings' bodyClassName='space-y-3'>
			<UpdateBusinessProfileForm business={business!} />
		</Card>
	);
}

export default Page;
