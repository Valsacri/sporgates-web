import { Popup } from '@/components/utils/Popup';
import { SubscriptionDtoType } from '@/dtos/item/club.dto';
import ClubSubscriptionForm from './ClubSubscriptionForm';

interface Props {
	subscription?: SubscriptionDtoType;
	onClose: () => void;
	onSubmit: (data: SubscriptionDtoType) => void;
}

function ClubSubscriptionFormPopup({
	subscription,
	onClose,
	onSubmit,
}: Props) {
	return (
		<Popup
			open={true}
			title={subscription ? 'Edit subscription' : 'Add a subscription'}
			description={
				subscription
					? 'Edit the details of the subscription.'
					: 'Fill in the details to add a new subscription.'
			}
			onClose={onClose}
			className='w-full lg:w-1/2'
		>
			<ClubSubscriptionForm
				subscription={subscription}
				onClose={onClose}
				onSubmit={onSubmit}
			/>
		</Popup>
	);
}

export default ClubSubscriptionFormPopup;
