import OpeningHoursPicker from '@/components/shared/OpeningHoursPicker';
import Card from '@/components/utils/Card';
import { OpeningHours } from '@/types/business.types';

function GroundOpeningHours({ openingHours }: { openingHours: OpeningHours }) {
	return (
		<Card title='Opening hours' className='h-max order-1 lg:order-2'>
			<OpeningHoursPicker readOnly value={openingHours} />
		</Card>
	);
}

export default GroundOpeningHours;
