import { Ground } from '@/types/business.interface';
import Card from '../utils/Card';
import Icon from '../utils/Icon';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Rating from '../shared/Rating';

interface Props {
	ground: Ground;
}

function GroundCard({ ground }: Props) {
	const defaultPrice = ground.prices.find((price) => price.isDefault);

	return (
		<Card className='group lg:min-w-[250px] p-0 flex flex-col hover:bg-primary-dark transition-all duration-200'>
			<Link href={`/page/grounds/${ground.id}`}>
				<div
					className={twMerge(
						'h-40 flex flex-col justify-between bg-gray-300 rounded-t-lg bg-cover bg-center'
					)}
					style={{
						backgroundImage: `url(${ground.images[0]})`,
					}}
				>
					<div
						className={twMerge(
							'flex',
							defaultPrice?.discount ? 'justify-between' : 'justify-end'
						)}
					>
						{defaultPrice?.discount && (
							<h5 className='w-max bg-success text-white rounded-tl-lg rounded-br-3xl px-3 py-1.5'>
								-{defaultPrice.discount}%
							</h5>
						)}
						<h5 className='w-max bg-primary text-white rounded-tr-lg rounded-bl-3xl pr-3 pl-5 py-1.5'>
							{defaultPrice?.amount} dh/{defaultPrice?.period}
						</h5>
					</div>

					<div className='w-max flex items-center gap-1 mt-3 p-2 pr-3 bg-black bg-opacity-50 rounded-tl-lg rounded-tr-3xl'>
						<Rating rating={ground.avgRating} />
						<span className='text-xs font-light text-white'>
							{' '}
							| {ground.reviews.length} reviews
						</span>
					</div>
				</div>

				<div className='flex flex-col justify-between p-5 pt-3 flex-grow'>
					<div>
						<h3 className='group-hover:text-white transition-all duration-200'>
							{ground.name}
						</h3>
						<div className='text-text-secondary group-hover:text-white transition-all duration-200'>
							<p className='text-sm mt-1'>{ground.description}</p>
							<div className='flex gap-1 items-center text-xs mt-3'>
								<Icon name='location' className='!size-5' />{' '}
								{ground.address.neighborhood}, {ground.address.city},{' '}
								{ground.address.country}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</Card>
	);
}

export default GroundCard;
