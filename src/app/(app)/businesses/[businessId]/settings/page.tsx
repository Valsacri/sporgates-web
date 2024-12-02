'use client';

import { redirect, useParams } from 'next/navigation';

function page() {
	const { businessId } = useParams();

	return redirect(`/businesses/${businessId}/settings/profile`);
}

export default page;
