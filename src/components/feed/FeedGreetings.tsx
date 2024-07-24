'use client';

import { useEffect, useState } from 'react';
import Avatar from '../utils/Avatar';
import Card from '../utils/Card';

function FeedGreetings() {
	const [imageSrc, setImageSrc] = useState('');
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const currentHour = new Date().getHours();

		if (currentHour >= 6 && currentHour < 12) {
			setImageSrc('/images/morning.png');
			setTitle('Good morning Oussama!');
			setMessage('Every new day is a chance to change your life.');
		} else if (currentHour >= 12 && currentHour < 18) {
			setImageSrc('/images/afternoon.png');
			setTitle('Good afternoon Oussama!');
			setMessage(
				'May this afternoon be light, blessed, enlightened, productive and happy.'
			);
		} else {
			setImageSrc('/images/afternoon.png');
			setTitle('Good evening Oussama!');
			setMessage(
				'The evening is the time for peace, where the world is at rest.'
			);
		}

		setIsLoading(false);
	}, []);

	return (
		<div className='bg-success pl-1 rounded-xl'>
			<Card className='flex justify-between'>
				<div>
					{isLoading ? (
						<>
							<div className='bg-gray-200 h-6 w-40 mb-2 rounded' />
							<div className='bg-gray-200 h-4 w-60 rounded' />
						</>
					) : (
						<>
							<h3 className='font-semibold'>{title}</h3>
							<p className='text-sm'>{message}</p>
						</>
					)}
				</div>
				<div>
					{isLoading ? (
						<div className='bg-gray-200 h-10 w-10 rounded-full animate-pulse' />
					) : (
						<Avatar src={imageSrc} size={40} className='rounded-none' />
					)}
				</div>
			</Card>
		</div>
	);
}

export default FeedGreetings;
