import Pricing from '@/components/shared/Pricing';
import Card from '@/components/utils/Card';
import { ClubSubscription } from '@/types/item/club.types';

interface Props {
	subscriptions: ClubSubscription[];
}

function GroundPricing({ subscriptions }: Props) {
	return (
		<Card title='Pricing'>
			<Card className='flex overflow-x-auto gap-3'>
				{subscriptions.map((subscription, index) => (
					<Pricing key={index} subscription={subscription} />
				))}
			</Card>
		</Card>
	);
}

export default GroundPricing;
