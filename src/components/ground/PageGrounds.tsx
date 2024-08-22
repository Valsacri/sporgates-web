'use client';

import { GROUNDS } from '@/data/grounds';
import Button from '../utils/Button';
import GroundCard from './GroundCard';
import ManageGroundPopup from './ManageGroundPopup';

function PageGrounds() {
	return (
		<>
			<ManageGroundPopup>
				<Button
					icon='plus'
					color='primary'
					className='fixed bottom-5 right-5 p-7 rounded-full'
					iconClassName='!size-12'
				></Button>
			</ManageGroundPopup>

			<h2>Explore our grounds !</h2>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				{GROUNDS.map((ground) => (
					<GroundCard key={ground._id} ground={ground} />
				))}
			</div>
		</>
	);
}

export default PageGrounds;
