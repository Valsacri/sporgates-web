import { twMerge } from 'tailwind-merge';
import Card from '../utils/Card';
import Button from '../utils/Button';

interface Props {
	type: 'user' | 'page';
}

function ProfileInfos({ type }: Props) {
	return (
		<Card
			className={twMerge(
				'group/cover flex flex-col justify-between gap-5 h-[300px] bg-cover bg-center',
				'bg-[url(https://sporgates.com/upload/photos/d-cover.jpg?cache=0)]'
			)}
		>
			<div className='opacity-0 group-hover/cover:opacity-100 transition-all duration-50 space-y-2'>
				<Button icon='insta' color='white' className='bg-opacity-80 ' />
				<Button icon='crop' color='white' className='bg-opacity-80 ' />
			</div>

			<div className='flex justify-between items-end'>
				<div className='flex items-center gap-5 text-white'>
					<div
						className={twMerge(
							'group/avatar size-[140px] rounded-full bg-cover bg-center',
							'bg-[url(https://sporgates.com/upload/photos/d-avatar.jpg?cache=0)]'
						)}
					>
						<div className='hidden group-hover/avatar:flex size-full rounded-full justify-around items-center bg-opacity-0 hover:bg-black hover:bg-opacity-20 transition-all duration-50'>
							<Button icon='insta' color='white' className='bg-opacity-80' />
							<Button icon='eye' color='white' className='bg-opacity-80' />
						</div>
					</div>

					<div>
						<h1>{type === 'page' ? 'JK Sports' : 'Oussama Khalfi'}</h1>
						<span className='text-sm'>
							{type === 'page' ? '@jk_sports' : '@oussamakhalfi'}
						</span>
					</div>
				</div>

				<div className='flex gap-3'>
					<Button icon='edit' color='white' className='rounded-full'>
						Edit profile
					</Button>
					<Button icon='todo' color='white' className='rounded-full'>
						Activities
					</Button>
				</div>
			</div>
		</Card>
	);
}

export default ProfileInfos;
