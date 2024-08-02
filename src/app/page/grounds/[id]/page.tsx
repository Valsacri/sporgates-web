'use client';

import MapboxMap from '@/components/utils/Map';
import Card from '@/components/utils/Card';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import Button from '@/components/utils/Button';
import Pricing from '@/components/Pricing';
import ManageGroundPopup from '@/components/ground/ManageGroundPopup';
import Image from 'next/image';
import { Price, PricePeriod } from '@/types/business.interface';

function GroundDetails() {
	const ground = {
		id: '1',
		name: 'JK Sports 2 mars',
		description:
			'Kayn douch blma skhoun o chrajm o lmosi9a o dyask dyal lc waikiki',
		address: {
			country: 'Morocco',
			city: 'Casablanca',
			neighborhood: '2 mars',
			street: '2 mars rue 33 n 44',
			zip: '10000',
			geoLocation: {
				lat: 12.3456,
				lng: 78.9012,
			},
		},
		images: [
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
			'https://images.squarespace-cdn.com/content/v1/628c0b6d5d2e1e3ca6023ce5/6382429b-b502-4859-9b9b-ba77f609a252/Header+Image+Gym.jpg',
		],
		price: 1000,
		pricePeriod: 'hour',
		rating: 4,
		reviews: 32,
		createdAt: 1629876543,
		updatedAt: null,
		deletedAt: null,
		createdBy: 'John Doe',
		updatedBy: null,
		deletedBy: null,
		openingHours: {
			Monday: '08:00 - 22:00',
			Tuesday: '08:00 - 22:00',
			Wednesday: '08:00 - 22:00',
			Thursday: '08:00 - 22:00',
			Friday: '08:00 - 22:00',
			Saturday: '08:00 - 22:00',
			Sunday: '08:00 - 22:00',
		},
	};

	const REVIEWS = [
		{
			id: 'r1',
			user: 'Alice Smith',
			rating: 5,
			comment:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolore at repellat facere recusandae eum quis unde assumenda, ex provident ad, corporis, quibusdam vitae architecto earum. Adipisci, reprehenderit? Minus, sunt.',
		},
		{
			id: 'r2',
			user: 'Bob Johnson',
			rating: 4,
			comment:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolore at repellat facere recusandae eum quis unde assumenda, ex provident ad, corporis, quibusdam vitae architecto earum. Adipisci, reprehenderit? Minus, sunt.',
		},
		{
			id: 'r3',
			user: 'Charlie Brown',
			rating: 3,
			comment:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolore at repellat facere recusandae eum quis unde assumenda, ex provident ad, corporis, quibusdam vitae architecto earum. Adipisci, reprehenderit? Minus, sunt.',
		},
	];

	const pricingOptions = [
		{
			period: '1 month',
			price: 599,
			bgColor: 'from-warning-dark to-warning',
			textColor: 'text-warning',
		},
		{
			period: '3 months',
			price: 1499,
			bgColor: 'from-primary-dark to-primary',
			textColor: 'text-primary',
		},
		{
			period: '6 months',
			price: 2499,
			bgColor: 'from-info-dark to-info',
			textColor: 'text-info',
		},
		{
			period: '1 year',
			price: 4499,
			bgColor: 'from-success-dark to-success',
			textColor: 'text-success',
		},
	];

	const reviews = [
		{
			id: '1',
			rating: 5,
			comment: 'Great place with excellent facilities and friendly staff.',
			user: 'Alice Smith',
		},
		{
			id: '2',
			rating: 4,
			comment: 'Good experience overall, but the music was a bit too loud.',
			user: 'Bob Johnson',
		},
		{
			id: '3',
			rating: 3,
			comment: 'Decent place but could use some cleaning.',
			user: 'Charlie Brown',
		},
	];

	const plans: Price[] = [
		{
			name: 'Star',
			amount: 400,
			period: PricePeriod.MONTH,
			description: 'Go limitless !',
			features: [
				'Featured member',
				'See profile visitors',
				'Show / Hide last seen',
				'Verified badge',
				'40 posts Posts promotion',
				'40 Pages Pages promotion',
				'60% Discount Discount',
				'96 MB Max upload size',
			],
			discount: 0,
			isDefault: false,
		},
		{
			name: 'Hot',
			amount: 800,
			period: PricePeriod.MONTH,
			description: 'Go limitless !',
			features: [
				'Featured member',
				'See profile visitors',
				'Show / Hide last seen',
				'Verified badge',
				'40 posts Posts promotion',
				'40 Pages Pages promotion',
				'60% Discount Discount',
				'96 MB Max upload size',
			],
			discount: 0,
			isDefault: false,
		},
		{
			name: 'Ultima',
			amount: 890,
			period: PricePeriod.MONTH,
			description: 'Go limitless !',
			features: [
				'Featured member',
				'See profile visitors',
				'Show / Hide last seen',
				'Verified badge',
				'40 posts Posts promotion',
				'40 Pages Pages promotion',
				'60% Discount Discount',
				'96 MB Max upload size',
			],
			discount: 0,
			isDefault: false,
		},
		{
			name: 'VIP',
			amount: 2590,
			period: PricePeriod.ONCE,
			description: 'Go limitless !',
			features: [
				'Featured member',
				'See profile visitors',
				'Show / Hide last seen',
				'Verified badge',
				'40 posts Posts promotion',
				'40 Pages Pages promotion',
				'60% Discount Discount',
				'96 MB Max upload size',
			],
			discount: 0,
			isDefault: true,
		},
	];

	return (
		<>
			<Card className='space-y-6'>
				<div className='flex justify-between'>
					<div>
						<h1>{ground.name}</h1>
						<div className='flex items-center gap-1 mt-2'>
							{Array.from({ length: ground.rating }).map((_, index) => (
								<HiStar key={index} className='text-yellow-400' />
							))}
							{Array.from({ length: 5 - ground.rating }).map((_, index) => (
								<HiOutlineStar key={index} className='text-yellow-400' />
							))}
							<span className='text-xs font-light'>
								{' '}
								| {ground.reviews} reviews
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

			<Card>
				<h2 className='text-lg font-medium mb-2'>Images</h2>
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

			<Card>
				<h2 className='text-lg font-medium mb-2'>Pricing</h2>

				<Card className='flex overflow-x-auto lg:grid grid-cols-2 gap-5'>
					{plans.map((plan, index) => (
						<Pricing key={index} price={plan} />
					))}
				</Card>
				{/* <div className='flex gap-4 overflow-x-auto'>
					{pricingOptions.map((option, index) => (
						<Card
							key={index}
							className={twMerge(
								'min-w-[300px] bg-gradient-to-br text-white rounded-lg shadow-lg space-y-2',
								option.bgColor
							)}
						>
							<h3 className='text-xl font-semibold'>{option.period}</h3>
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
							<ul className='list-disc list-inside'>
								<li>Feature 1</li>
								<li>Feature 2</li>
								<li>Feature 3</li>
								<li>Feature 4</li>
							</ul>
							<h1 className='text-center mb-5'>{option.price} dh</h1>
							<Button
								color='white'
								className={twMerge(
									'w-full font-semibold text-lg',
									option.textColor
								)}
							>
								Purchase
							</Button>
						</Card>
					))}
				</div> */}
			</Card>

			<Card>
				<div className='mb-2'>
					<h2 className='text-lg font-medium'>Address</h2>
					<p>{`${ground.address.street}, ${ground.address.neighborhood}, ${ground.address.city}, ${ground.address.country}`}</p>
					<p>{`ZIP: ${ground.address.zip}`}</p>
				</div>
				<MapboxMap
					lat={ground.address.geoLocation.lat}
					lng={ground.address.geoLocation.lng}
				/>
			</Card>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
				<Card className='order-2 lg:order-1'>
					<div className='flex justify-between mb-5'>
						<h2 className='text-lg font-medium mb-2'>Reviews</h2>

						<div className='flex gap-3'>
							<div>
								<div className='flex items-center'>
									{Array.from({ length: 4 }).map((_, index) => (
										<HiStar key={index} className='text-yellow-400' />
									))}
									{Array.from({ length: 1 }).map((_, index) => (
										<HiOutlineStar key={index} className='text-yellow-400' />
									))}
								</div>
								<p className='text-xs text-text-secondary text-end'>
									32 reviews
								</p>
							</div>

							<h1 className='text-3xl'>4.7</h1>
						</div>
					</div>

					{REVIEWS.map((review) => (
						<div key={review.id} className='mb-4'>
							<div className='flex justify-between'>
								<h4>{review.user}</h4>
								<p className='text-xs text-text-secondary'>2 days ago</p>
							</div>
							<div className='flex items-center'>
								{Array.from({ length: review.rating }).map((_, index) => (
									<HiStar key={index} className='text-yellow-400' />
								))}
								{Array.from({ length: 5 - review.rating }).map((_, index) => (
									<HiOutlineStar key={index} className='text-yellow-400' />
								))}
							</div>
							<p className='text-sm mt-2'>{review.comment}</p>
							<hr className='mt-3' />
						</div>
					))}
				</Card>

				<Card className='h-max order-1 lg:order-2'>
					<h2 className='text-lg font-medium mb-2'>Opening Hours</h2>
					<ul className='space-y-4'>
						{Object.entries(ground.openingHours).map(([day, hours]) => (
							<li key={day} className='flex justify-between'>
								<span>{day}</span>
								<span>{hours}</span>
							</li>
						))}
					</ul>
				</Card>
			</div>
		</>
	);
}

export default GroundDetails;
