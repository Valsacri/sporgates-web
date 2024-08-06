import { HiCheck } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { Price } from '@/types/business.interface';
import Card from '../utils/Card';
import Button from '../utils/Button';

interface Props {
	price: Price;
}

function Pricing({ price }: Props) {
	return (
		<Card
			className={twMerge(
				'flex flex-col justify-between gap-5 min-w-full rounded-3xl py-7 shadow-xl shadow-gray-200',
				price.isDefault && 'bg-primary-dark text-white'
			)}
		>
			<div className='space-y-5'>
				<div>
					<span
						className={twMerge(
							'font-bold text-3xl',
							!price.isDefault && 'text-primary'
						)}
					>
						{price.amount}dh
					</span>{' '}
					<span>/ {price.period}</span>
				</div>
				<div className='space-y-2'>
					<div
						className={twMerge(
							'text-3xl font-medium',
							!price.isDefault && 'text-primary'
						)}
					>
						{price.name}
					</div>
					<p>{price.description}</p>
				</div>
				<div>
					<ul className='space-y-3'>
						{price.features.map((feature, i) => (
							<li key={i} className='flex gap-2 items-center'>
								<HiCheck
									className={twMerge(
										'bg-opacity-20 rounded-full p-0.5 size-5',
										price.isDefault ? 'bg-white' : 'bg-primary'
									)}
								/>
								{feature}
							</li>
						))}
					</ul>
				</div>
			</div>

			<Button
				color={price.isDefault ? 'white' : 'primary'}
				className={twMerge(
					'w-full rounded-full text-base font-medium',
					price.isDefault && 'text-primary-dark'
				)}
			>
				Subscribe
			</Button>
		</Card>
	);
}

export default Pricing;
