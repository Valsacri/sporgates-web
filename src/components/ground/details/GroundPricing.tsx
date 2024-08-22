import Pricing from '@/components/shared/Pricing';
import Card from '@/components/utils/Card';
import { Subscription } from '@/types/business.types';

interface Props {
	subscriptions: Subscription[];
}

function GroundPricing({ subscriptions }: Props) {
	return (
		<Card title='Pricing'>
			<Card className='flex overflow-x-auto gap-5'>
				{subscriptions.map((subscription, index) => (
					<Pricing key={index} subscription={subscription} />
				))}
			</Card>
		</Card>
	);
}

export default GroundPricing;
