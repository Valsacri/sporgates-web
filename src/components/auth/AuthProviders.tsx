import { twMerge } from 'tailwind-merge';
import Button from '../utils/Button';
import Image from 'next/image';

function AuthProviders({ compact = false }) {
	return (
		<div className={twMerge('flex flex-col gap-2', compact && 'flex-row')}>
			<Button
				icon={
					<Image
						src='/svg/google.svg'
						width={20}
						height={20}
						alt='google'
						className='mr-2'
					/>
				}
				color='secondary'
				className={twMerge('w-full mx-auto py-6', !compact && 'rounded-full')}
			>
				{' '}
				{!compact && 'Connect with google'}{' '}
			</Button>

			<Button
				icon={
					<Image
						src='/svg/facebook.svg'
						width={20}
						height={20}
						alt='google'
						className='mr-2'
					/>
				}
				color='secondary'
				className={twMerge('w-full mx-auto py-6', !compact && 'rounded-full')}
			>
				{' '}
				{!compact && 'Connect with facebook'}{' '}
			</Button>
		</div>
	);
}

export default AuthProviders;
