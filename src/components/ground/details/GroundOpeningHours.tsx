import OpeningHoursSelector from '@/components/shared/OpeningHoursSelector';
import Card from '@/components/utils/Card';

function GroundOpeningHours({ openingHours }: { openingHours: any }) {
	return (
		<Card title='Opening hours' className='h-max order-1 lg:order-2'>
			<OpeningHoursSelector />
		</Card>
	);
}

export default GroundOpeningHours;
