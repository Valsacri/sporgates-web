'use client';

import StaffTable from '@/components/business/StaffTable';
import Card from '@/components/utils/Card';
import { useParams } from 'next/navigation';

function Page() {
	const { businessId } = useParams();

	return (
		<Card title='Business staff'>
			<StaffTable businessId={businessId as string} />
		</Card>
	);
}

export default Page;
