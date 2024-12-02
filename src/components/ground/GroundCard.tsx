import Card from '../utils/Card';
import Icon, { SPORTS_ICONS } from '../utils/Icon';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Rating from '../shared/Rating';
import { Ground } from '@/types/item/ground/ground.types';
import { Address, City, Town } from '@/types/geo.types';
import { Sport } from '@/types/sport.types';

interface Props {
	ground: Ground;
}

function GroundCard({ ground }: Props) {
	return (
		<Card className='group lg:min-w-[250px] p-0 flex flex-col hover:bg-primary-dark transition-all duration-200'>
			<Link href={`/grounds/${ground.id}`}>
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
							'flex'
							// defaultPrice?.discount ? 'justify-between' : 'justify-end'
						)}
					>
						{/* <h5 className='w-max bg-success text-white rounded-tl-lg rounded-br-2xl px-3 py-1.5'>
							-{defaultPrice.discount}%
						</h5> */}
						<div className='flex gap-1 w-max bg-black bg-opacity-50 text-white rounded-tl-md rounded-br-2xl px-3 py-1.5'>
							{(ground.sports as Sport[]).map(
								(sport) => SPORTS_ICONS[sport.code]
							)}
						</div>
						<h5 className='w-max bg-primary text-white rounded-tr-md rounded-bl-2xl px-3 py-1.5 ml-auto'>
							{ground.price}dh / {ground.minReservationTime}min
						</h5>
					</div>

					<div className='w-max flex items-center gap-1 mt-3 p-2 pr-3 bg-black bg-opacity-50 rounded-tl-md rounded-tr-2xl'>
						<Rating value={ground.avgRating} />
						<span className='text-xs font-light text-white'>
							{' '}
							| {ground.reviews.length} reviews
						</span>
					</div>
				</div>

				<div className='flex flex-col justify-between p-4 pt-3 flex-grow'>
					<div>
						<h3 className='group-hover:text-white transition-all duration-200'>
							{ground.name}
						</h3>
						<div className='text-text-secondary group-hover:text-white transition-all duration-200'>
							<p className='text-sm mt-1'>
								{ground.description.slice(0, 100)}...
							</p>
							<div className='flex gap-1 items-center text-xs mt-3'>
								<Icon name='location' className='!size-5' />{' '}
								{((ground.address as Address).town as Town).name},{' '}
								{((ground.address as Address).city as City).name}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</Card>
	);
}

export default GroundCard;
