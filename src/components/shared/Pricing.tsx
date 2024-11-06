import { HiCheck } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import Card from '../utils/Card';
import Button from '../utils/Button';
import { ClubSubscription } from '@/types/item/club.types';

interface Props {
	subscription: ClubSubscription;
}

function Pricing({ subscription }: Props) {
	return (
		<Card
			className={twMerge(
				'max-w-96 flex flex-col justify-between gap-3 rounded-3xl py-7 shadow-xl shadow-gray-200',
				subscription.isHighlighted && 'bg-primary-dark text-white'
			)}
		>
			<div className='space-y-3'>
				<div>
					<span
						className={twMerge(
							'font-bold text-3xl',
							!subscription.isHighlighted && 'text-primary'
						)}
					>
						{subscription.price}dh
					</span>{' '}
					<span>
						/ {subscription.period.amount} {subscription.period.duration}
					</span>
				</div>
				<div className='space-y-2'>
					<div
						className={twMerge(
							'text-3xl font-medium',
							!subscription.isHighlighted && 'text-primary'
						)}
					>
						{subscription.name}
					</div>
					<p>{subscription.description}</p>
				</div>
				<div>
					<ul className='space-y-3 text-sm'>
						{subscription.features.map((feature, i) => (
							<li key={i} className='flex gap-2'>
								<HiCheck
									className={twMerge(
										'bg-opacity-20 rounded-full p-0.5 min-w-5 min-h-5',
										subscription.isHighlighted ? 'bg-white' : 'bg-primary'
									)}
								/>
								{feature.description}
							</li>
						))}
					</ul>
				</div>
			</div>

			<Button
				color={subscription.isHighlighted ? 'white' : 'primary'}
				className={twMerge(
					'w-full rounded-full text-base font-medium',
					subscription.isHighlighted && 'text-primary-dark'
				)}
			>
				Subscribe
			</Button>
		</Card>
	);
}

export default Pricing;
