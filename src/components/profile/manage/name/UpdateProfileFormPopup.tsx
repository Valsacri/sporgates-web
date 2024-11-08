'use client';

import { Popup } from '@/components/utils/Popup';
import { usePopup } from '@/client/hooks/utils/usePopup';
import UpdateProfileForm from './UpdateProfileForm';
import { ProfileType } from '@/types/general.types';
import { User } from '@/types/user.types';
import { Business } from '@/types/business.types';

interface Props {
	children: React.ReactNode;
	type: ProfileType;
	profile: User | Business;
}

function UpdateProfileFormPopup({ children, type, profile }: Props) {
	const [open, toggleOpen] = usePopup();

	return (
		<>
			<div onClick={toggleOpen}>{children}</div>

			{open && (
				<Popup
					open={true}
					title='Update profile'
					description='Update the details of the ground.'
					onClose={toggleOpen}
					className='w-full lg:w-1/2'
				>
					<UpdateProfileForm type={type} profile={profile} />
				</Popup>
			)}
		</>
	);
}

export default UpdateProfileFormPopup;
