import { twMerge } from 'tailwind-merge';
import Card from '../../utils/Card';
import Status from './Status';

function Statuses() {
	const statuses = [{}, {}, {}, {}, {}, {}, {}];

	return (
		<Card className='p-0 pt-5'>
			<div className='flex gap-3 overflow-x-auto pb-5'>
				{statuses.map((status, i) => (
					<Status
						key={i}
						className={twMerge(
							i === 0 ? 'ml-5' : '',
							i === statuses.length - 1 ? 'mr-5' : ''
						)}
					/>
				))}
			</div>
		</Card>
	);
}

export default Statuses;
