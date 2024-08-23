import OpeningHoursPicker from '@/components/shared/OpeningHoursPicker';
import Card from '@/components/utils/Card';

function GroundOpeningHours({ openingHours }: { openingHours: any }) {
	return (
		<Card title='Opening hours' className='h-max order-1 lg:order-2'>
			<OpeningHoursPicker readOnly />
		</Card>
	);
}

export default GroundOpeningHours;
