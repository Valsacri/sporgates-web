import { Ground } from '@/types/business.interface';
import Card from '../utils/Card';
import Icon from '../utils/Icon';
import { twMerge } from 'tailwind-merge';
import Button from '../utils/Button';

interface Props {
	ground: Ground;
}

function GroundCard({ ground }: Props) {
	return (
		<Card className='min-w-96 p-0 flex flex-col'>
			<div
				className={twMerge(
					'h-40 bg-gray-300 rounded-t-lg p-2 bg-cover bg-center'
				)}
				style={{
					backgroundImage: `url(${ground.images[0]})`,
				}}
			>
				<div className='w-max bg-black bg-opacity-30 ml-auto rounded-full px-3 py-1'>
					<h5 className='text-white'>{ground.price} dh/month</h5>
				</div>
			</div>

			<div className='flex flex-col justify-between px-5 py-3 flex-grow'>
				<div> 
					<h3>{ground.name}</h3>
					<p className='text-text-secondary text-sm mt-1'>
						{ground.description}
					</p>
					<div className='flex justify-end gap-1 items-center text-xs mt-3 text-text-secondary'>
						<Icon name='location' className='text-text-secondary !size-5' />{' '}
						{ground.address.neighborhood}, {ground.address.city},{' '}
						{ground.address.country}
					</div>
				</div>

				<div className="flex gap-2">
				  <Button color='primary' variant='outlined' className='mt-3 w-full'>
				  	Checkout
				  </Button>
				  <Button color='primary' variant='outlined' className='mt-3 w-full'>
				  	Details
				  </Button>
				</div>
			</div>
		</Card>
	);
}

export default GroundCard;
