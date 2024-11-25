'use client';

import { Popup } from '@/components/utils/Popup';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { Business } from '@/types/business.types';
import UpdateBusinessForm from './UpdateBusinessForm';
import CreateBusinessForm from './CreateBusinessForm';

interface Props {
	children: React.ReactNode;
	business?: Business;
}

function BusinessFormPopup({ children, business }: Props) {
	const [open, toggleOpen] = usePopup();

	return (
		<>
			<div onClick={toggleOpen}>{children}</div>

			{open && (
				<Popup
					open={true}
					title={business ? 'Edit business' : 'Create a business'}
					description={
						business
							? 'Edit the details of the business.'
							: 'Fill in the details to create a new business.'
					}
					onClose={toggleOpen}
					className='w-full lg:w-1/2'
				>
					{business ? (
						<UpdateBusinessForm business={business} />
					) : (
						<CreateBusinessForm />
					)}
				</Popup>
			)}
		</>
	);
}

export default BusinessFormPopup;
