'use client';

import MapboxMap from '@/components/utils/Map';
import Card from '@/components/utils/Card';
import Button from '@/components/utils/Button';
import ManageGroundPopup from '@/components/ground/ManageGroundPopup';
import Image from 'next/image';
import { GROUNDS } from '@/data/grounds';
import Rating from '@/components/shared/Rating';
import Pricing from '@/components/shared/Pricing';
import { User } from '@/types/user.interface';
import Reservation from '@/components/shared/Reservation';
import { twMerge } from 'tailwind-merge';
import Dropdown from '@/components/utils/Dropdown';

interface Props {
	params: {
		id: string;
	};
}

function GroundDetails({ params: { id } }: Props) {
	const ground = GROUNDS.find((ground) => ground.id.toString() === id)!;

	return (
		<div className='space-y-5'>
			<Card className='grid grid-cols-4 gap-2'>
				{ground.images.map((image, index) => (
					<Image
						key={index}
						src={image}
						alt={`Image ${index + 1}`}
						className={twMerge(
							'w-full h-auto rounded-md',
							index === 0 && 'col-span-2 row-span-2'
						)}
						width={200}
						height={100}
					/>
				))}
			</Card>

			<div className='grid grid-cols-3 gap-5'>
				<div className='space-y-5 col-span-2'>
					<Card className='space-y-6'>
						<div className='flex justify-between'>
							<div>
								<h1>{ground.name}</h1>
								<div className='flex items-center gap-1 mt-2'>
									<Rating rating={ground.avgRating} />
									<span className='text-xs font-light'>
										{' '}
										| {ground.reviews.length} reviews
									</span>
								</div>
							</div>
							<ManageGroundPopup>
								<Button icon='edit' color='secondary'></Button>
							</ManageGroundPopup>
						</div>
						<div>
							<h2 className='text-lg font-medium'>Description</h2>
							<p>{ground.description}</p>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
								praesentium cupiditate sit cum debitis quidem natus,
								voluptatibus eius sequi consequuntur, consequatur error deserunt
								placeat repudiandae dolore autem aliquid corporis odit?
							</p>
						</div>
					</Card>

					<Card title='Pricing'>
						<Card className='flex overflow-x-auto gap-5'>
							{ground.prices.map((price, index) => (
								<Pricing key={index} price={price} />
							))}
						</Card>
					</Card>

					<Card title='Address' className='space-y-3'>
						<MapboxMap
							lat={ground.address.geoLocation.lat}
							lng={ground.address.geoLocation.lng}
						/>
						<p className='text-sm'>{`${ground.address.street}, ${ground.address.neighborhood}, ${ground.address.zip} ${ground.address.city}, ${ground.address.country}`}</p>
					</Card>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
						<Card className='order-2 lg:order-1'>
							<div className='flex justify-between mb-5'>
								<h2 className='mb-2'>Reviews</h2>
								<div className='flex gap-3'>
									<div>
										<Rating rating={ground.avgRating} />
										<p className='text-xs text-text-secondary text-end'>
											{ground.reviews.length} reviews
										</p>
									</div>
									<h1 className='text-3xl'>4.7</h1>
								</div>
							</div>
							{ground.reviews.map((review, i) => (
								<div key={i} className='mb-4'>
									<div className='flex justify-between'>
										<h4>{(review.user as User).username}</h4>
										<p className='text-xs text-text-secondary'>2 days ago</p>
									</div>
									<Rating rating={review.rating} />
									<p className='text-sm mt-2'>{review.comment}</p>
									<hr className='mt-3' />
								</div>
							))}
						</Card>

						<Card title='Opening hours' className='h-max order-1 lg:order-2'>
							<ul className='space-y-4'>
								{Object.entries(ground.openingHours).map(([day, timeframe]) => (
									<li key={day} className='flex justify-between'>
										<span>{day}</span>
										<span>
											{timeframe.from} - {timeframe.to}
										</span>
									</li>
								))}
							</ul>
						</Card>
					</div>
				</div>

				<Card className='sticky h-max'>
					<h3 className='mb-3 text-end'>50 DH/h</h3>
					<div className='flex border rounded-md'>
						<Dropdown
							containerClassName='w-1/2'
							trigger={
								<div className='border-r-[0.5px] p-3'>
									<h6>Date</h6>
									<p className='text-sm'>12/12/2021</p>
								</div>
							}
						>
							<Card>
								<Reservation />
							</Card>
						</Dropdown>

						<Dropdown
							containerClassName='w-1/2'
							trigger={
								<div className='border-r-[0.5px] p-3'>
									<h6>Duration</h6>
									<p className='text-sm'>2 hours 30 min</p>
								</div>
							}
						>
							<Card>
								<Reservation />
							</Card>
						</Dropdown>
					</div>

					<Button icon='check' color='primary' className='w-full mt-5'>
						Reserve now
					</Button>

					<hr className='my-3' />

					<div className='flex justify-between'>
						<h3>Total</h3>
						<p className='text-success'>125 DH</p>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default GroundDetails;