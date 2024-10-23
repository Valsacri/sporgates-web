import Button from '../utils/Button';
import GroundCard from './GroundCard';
import GroundFormPopup from './manage/GroundFormPopup';
import { GroundServerService } from '@/server/services/ground.server-service';
import { Ground } from '@/types/item/ground.types';

async function GroundsList() {
	let grounds: Ground[];

	try {
		grounds = await GroundServerService.getPage();
	} catch (error) {
		console.error(error);
		return <div>Error</div>;
	}

	return (
		<>
			<GroundFormPopup>
				<Button
					icon='plus'
					color='primary'
					className='fixed bottom-5 right-5 p-7 rounded-full'
					iconClassName='!size-12'
				></Button>
			</GroundFormPopup>

			<h2>Explore our grounds !</h2>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				{grounds.map((ground, i) => (
					<GroundCard key={i} ground={ground} />
				))}
			</div>
		</>
	);
}

export default GroundsList;
