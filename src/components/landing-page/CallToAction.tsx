'use client';

import Image from 'next/image';
import Button from '../utils/Button';
import Link from 'next/link';

export default function CallToAction() {
	return (
		<div className='w-full md:w-max flex flex-col items-center'>
			<Image
				src='/images/basketball.webp'
				width={250}
				height={250}
				alt='Find players icon'
				className='animate-animation-bounce'
			/>
			<Link href='/sign-up' className='w-full'>
				<Button
					color='primary'
					className='h-12 w-full rounded-full uppercase font-semibold'
				>
					Join now!
				</Button>
			</Link>
		</div>
	);
}
