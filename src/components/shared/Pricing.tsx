import { HiCheck } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { Subscription } from '@/types/business.types';
import Card from '../utils/Card';
import Button from '../utils/Button';

interface Props {
	subscription: Subscription;
}

function Pricing({ subscription }: Props) {
	return (
		<Card
			className={twMerge(
				'min-w-max flex flex-col justify-between gap-5 rounded-3xl py-7 shadow-xl shadow-gray-200',
				subscription.isDefault && 'bg-primary-dark text-white'
			)}
		>
			<div className='space-y-5'>
				<div>
					<span
						className={twMerge(
							'font-bold text-3xl',
							!subscription.isDefault && 'text-primary'
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
							!subscription.isDefault && 'text-primary'
						)}
					>
						{subscription.name}
					</div>
					<p>{subscription.description}</p>
				</div>
				<div>
					<ul className='space-y-3'>
						{subscription.features.map((feature, i) => (
							<li key={i} className='flex gap-2 items-center'>
								<HiCheck
									className={twMerge(
										'bg-opacity-20 rounded-full p-0.5 size-5',
										subscription.isDefault ? 'bg-white' : 'bg-primary'
									)}
								/>
								{feature}
							</li>
						))}
					</ul>
				</div>
			</div>

			<Button
				color={subscription.isDefault ? 'white' : 'primary'}
				className={twMerge(
					'w-full rounded-full text-base font-medium',
					subscription.isDefault && 'text-primary-dark'
				)}
			>
				Subscribe
			</Button>
		</Card>
	);
}

export default Pricing;
