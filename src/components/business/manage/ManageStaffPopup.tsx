'use client';

import { Popup } from '@/components/utils/Popup';
import { usePopup } from '@/client/hooks/utils/usePopup';

interface Props {
	children: React.ReactNode;
	businessId: string;
}

function ManageStaffPopup({ children, businessId }: Props) {
	const [open, toggleOpen] = usePopup();

	return (
		<>
			<div onClick={toggleOpen}>{children}</div>

			{open && (
				<Popup
					open={true}
					title='Manage Staff'
					description='Manage the staff of your business.'
					onClose={toggleOpen}
					className='w-full lg:w-1/2'
				>
					{/* <StaffTable businessId={businessId} /> */}
				</Popup>
			)}
		</>
	);
}

export default ManageStaffPopup;
