import Pricing from '@/components/shared/Pricing';
import Card from '@/components/utils/Card';

function GroundPricing({ prices }: { prices: any[] }) {
	return (
		<Card title='Pricing'>
			<Card className='flex overflow-x-auto gap-5'>
				{prices.map((price, index) => (
					<Pricing key={index} price={price} />
				))}
			</Card>
		</Card>
	);
}

export default GroundPricing;
