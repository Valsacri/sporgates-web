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
import Calendar from 'react-calendar';
import Buttons from '@/components/profile/Buttons';
import Reservation from '@/components/shared/Reservation';

interface Props {
	params: {
		id: string;
	};
}

function GroundDetails({ params: { id } }: Props) {
	const ground = GROUNDS.find((ground) => ground.id.toString() === id)!;



	return (
		<>
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
						praesentium cupiditate sit cum debitis quidem natus, voluptatibus
						eius sequi consequuntur, consequatur error deserunt placeat
						repudiandae dolore autem aliquid corporis odit?
					</p>
				</div>
			</Card>

			<Card
				title='Reservation'
				description='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
			>
				<Reservation />
			</Card>

			<Card title='Images'>
				<div className='flex overflow-x-auto lg:grid grid-cols-3 gap-2'>
					{ground.images.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={`Image ${index + 1}`}
							className='w-11/12 lg:w-full h-auto rounded-md'
							width={200}
							height={100}
						/>
					))}
				</div>
			</Card>

			<Card title='Pricing'>
				<Card className='flex overflow-x-auto lg:grid grid-cols-2 gap-5'>
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
									{timeframe.from}:00 - {timeframe.to}:00
								</span>
							</li>
						))}
					</ul>
				</Card>
			</div>
		</>
	);
}

export default GroundDetails;
