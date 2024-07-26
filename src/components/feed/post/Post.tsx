import Avatar from '@/components/utils/Avatar';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import Icon from '@/components/utils/Icon';
import { Input } from '@/components/utils/Input';
import { IPost } from '@/types/post.interface';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
	post: any;
}

function Post({ post }: Props) {
	const TARGET_FUND = 100;
	const funds = 50;

	return (
		<Card key={post.id} className='space-y-5'>
			<div className='flex justify-between'>
				<div className='flex gap-5'>
					<div className='relative'>
						<Avatar
							src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
							size={60}
							className='rounded-md'
						/>
						<Icon
							name='shield-check'
							containerClassName='absolute -bottom-2 -right-0 bg-info rounded-full text-white p-0.5'
							className='size-5'
						/>
					</div>
					<div>
						<div className='flex items-center gap-2'>
							<h3>{post.title}</h3>
							<span className='text-sm text-text-secondary'>
								{post.subject}
							</span>

							{/* <span className='flex items-center'>
								<Icon name='award' className='text-accent text-2xl' />
								<span className='text-accent text-xs'>Sponsored</span>
							</span> */}
						</div>
						<div className='text-xs text-text-secondary'>{post.date}</div>
					</div>
				</div>
			</div>

			<p className='mt-5'>{post.body}</p>

			{post.image && (
				<div className='relative'>
					<Image
						src={post.image}
						width={600}
						height={300}
						alt='post image'
						className='w-full'
					/>

					{post.subject === 'donation-request' && (
						<Card className='w-full rounded-t-none absolute bottom-0 left-0 bg-primary-dark bg-opacity-9 text-white space-y-3'>
							<div className='flex flex-col lg:flex-row justify-between'>
								<span>Jeux olympiques</span>
								<div className='flex items-center gap-2 font-medium'>
									<span className='text-success'>50000 DH</span>{' '}
									<span>/ 10000 DH</span>
								</div>
							</div>

							<div className='w-full bg-secondary rounded-full'>
								<div
									className='h-2 bg-success rounded-full'
									style={{
										width: `${(funds / TARGET_FUND) * 100}%`,
									}}
								></div>
							</div>
						</Card>
					)}
				</div>
			)}

			{post.subject === 'new-offer' && post.offer && (
				// display the original price, the discount, and the final price. and display a button to buy the offer
				<Card className='flex flex-col lg:flex-row gap-2 justify-between items-center bg-secondary border-2 border-opacity-50'>
					<span className='text-text-secondary flex items-center gap-2'>
						<Icon name='clock' className='' />
						<span className='text-sm'>Ends in 3 days</span>
					</span>

					<div className='space-x-2'>
						<span className='line-through font-medium text-lg text-danger'>
							{post.offer.originalPrice} DH
						</span>
						<span className='text-success'>
							{post.offer.disountType === 'percentage'
								? post.offer.originalPrice -
								  (post.offer.originalPrice * post.offer.discount) / 100
								: post.offer.originalPrice - post.offer.discount}{' '}
							DH
						</span>
					</div>

					<Button
						icon='bag'
						color='success'
						className='text-center w-full lg:w-max'
					>
						{post.offer.discount}{' '}
						{post.offer.disountType === 'percentage' ? '%' : 'DH'} off !
					</Button>
				</Card>
			)}

			<div className='flex justify-between items-center'>
				<div className='flex'>
					<Button
						icon='heart'
						className='hover:scale-110 transition-all duration-[50]'
					/>
					<Button
						icon='message'
						className='hover:scale-110 transition-all duration-[50]'
					/>
					<Button
						icon='send'
						className='hover:scale-110 transition-all duration-[50]'
					/>
				</div>

				<button className='text-sm text-text-secondary hover:underline'>
					0 comments
				</button>
			</div>

			<div className='flex gap-3'>
				<Avatar
					src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
					size={40}
				/>
				<Input placeholder='Write a comment...' name='post' />
			</div>
		</Card>
	);
}

export default Post;
