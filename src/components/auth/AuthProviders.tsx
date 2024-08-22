import Button from '../utils/Button';
import Image from 'next/image';

function AuthProviders() {
	return (
		<>
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
				className='w-full mx-auto py-6 rounded-full'
			>
				{' '}
				Connect with google{' '}
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
				className='w-full mx-auto py-6 rounded-full'
			>
				{' '}
				Connect with facebook{' '}
			</Button>
		</>
	);
}

export default AuthProviders;
