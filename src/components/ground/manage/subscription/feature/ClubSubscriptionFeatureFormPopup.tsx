import { SubscriptionFeatureDtoType } from '@/dtos/item/club.dto';
import ClubSubscriptionFeatureForm from './ClubSubscriptionFeatureForm';
import { Popup } from '@/components/utils/Popup';

interface Props {
	feature?: SubscriptionFeatureDtoType;
	onClose: () => void;
	onSubmit: (data: SubscriptionFeatureDtoType) => void;
}

function ClubSubscriptionFeatureFormPopup({
	feature,
	onClose,
	onSubmit,
}: Props) {
	return (
		<Popup
			open={true}
			title='Add a feature'
			description='Fill in the details to add a new feature.'
			onClose={onClose}
			className='w-full lg:w-1/4'
		>
			<ClubSubscriptionFeatureForm
				feature={feature}
				onClose={onClose}
				onSubmit={onSubmit}
			/>
		</Popup>
	);
}

export default ClubSubscriptionFeatureFormPopup;
