'use client';

import { Popup } from '@/components/utils/Popup';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { Ground } from '@/types/item/ground/ground.types';
import GroundForm from './GroundForm';

interface Props {
	children: React.ReactNode;
	businessId?: string;
	ground?: Ground;
}

function GroundFormPopup({ children, businessId, ground }: Props) {
	const [open, toggleOpen, setOpen] = usePopup();

	return (
		<>
			<div onClick={toggleOpen}>{children}</div>

			{open && (
				<Popup
					open={true}
					title={ground ? 'Update ground' : 'Create a ground'}
					description={
						ground
							? 'Update the details of the ground.'
							: 'Fill in the details to create a new ground.'
					}
					onClose={() => setOpen(false)}
					className='w-full lg:w-1/2'
				>
					<GroundForm
						ground={ground}
						businessId={businessId}
						onClose={() => setOpen(false)}
					/>
				</Popup>
			)}
		</>
	);
}

export default GroundFormPopup;
