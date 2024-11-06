'use client';

import { twMerge } from 'tailwind-merge';
import Button from '../utils/Button';
import Card from '../utils/Card';
import { useState } from 'react';
import { CocoIcon } from '@/client/config/coco-icons';
import Icon from '../utils/Icon';

function ProfileCompletion() {
	const [percentage, setPercentage] = useState(0);

	const steps: { name: string; icon: CocoIcon; completed: boolean }[] = [
		{ name: 'Add a profile picture', icon: 'user', completed: true },
		{ name: 'Add your location', icon: 'location', completed: true },
		{ name: 'Add your favorite sports', icon: 'heart', completed: false },
	];

	return (
		<Card title='Profile completion'>
			<div className='space-y-3'>
				<p className='text-sm'>
					Complete your profile to let others find you easily !
				</p>

				<div className='flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3'>
					<div className='w-full flex flex-col lg:flex-row gap-3'>
						{steps.map((step, i) => (
							<Button
								key={i}
								icon={step.icon}
								className={twMerge(
									'w-full lg:w-max rounded-md border',
									step.completed
										? 'border-success-light bg-success-light text-success hover:bg-success-light line-through cursor-default'
										: 'bg-opacity-50 text-text-secondary'
								)}
								color='transparent'
								onClick={() =>
									setPercentage(Math.round(((i + 1) * 100) / steps.length))
								}
							>
								{step.name}
							</Button>
						))}
					</div>

					<div className='ml-auto text-nowrap'>{percentage}% completed</div>
				</div>

				<div className='relative h-2 bg-gray-200 rounded-full'>
					<div
						className={twMerge(
							'absolute h-2 rounded-full transition-all duration-300',
							percentage < 100 / 3
								? 'bg-danger'
								: percentage < 200 / 3
								? 'bg-warning'
								: 'bg-success'
						)}
						style={{ width: `${percentage}%` }}
					></div>
				</div>
			</div>
		</Card>
	);
}

export default ProfileCompletion;
