'use client';

import { BusinessContext } from '@/client/contexts/business.context';
import { Business } from '@/types/business.types';

interface Props {
	business: Business;
	children: React.ReactNode;
}

function BusinessContextProvider({ business, children }: Props) {
	return (
		<BusinessContext.Provider value={business}>
			{children}
		</BusinessContext.Provider>
	);
}

export default BusinessContextProvider;
