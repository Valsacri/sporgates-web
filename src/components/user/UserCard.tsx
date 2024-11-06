import Image from 'next/image';
import Card from '../utils/Card';
import Avatar from '../utils/Avatar';
import Rating from '../shared/Rating';
import Icon, { SPORTS_ICONS } from '../utils/Icon';
import { User } from '@/types/user.types';
import { City, Town } from '@/types/geo.types';
import { Sport } from '@/types/sport.types';

interface Props {
	user: User;
}

function UserCard({ user }: Props) {
	return (
		<Card className='p-0 pb-5'>
			<Image
				src={user.cover || '/images/placeholder.png'}
				width={1000}
				height={300}
				alt='cover'
				className='rounded-t-md'
			/>

			<div className='-mt-12'>
				<div>
					<Avatar
						src={user.avatar || '/images/avatar-placeholder.png'}
						size={100}
						className='border-white mx-auto'
					/>
				</div>

				<div className='text-center mt-3 px-5'>
					<h2>
						{user.name}
					</h2>
					<span className='text-sm text-text-secondary'>@{user.username}</span>
					<p className='text-sm mt-2 text-text-secondary-dark'>{user.bio}</p>

					{user.address && (
						<div className='flex gap-1 justify-center items-center text-xs text-text-secondary mt-3'>
							<Icon name='location' className='!size-5' />{' '}
							{(user.address?.town as Town)?.name},{' '}
							{(user.address?.city as City)?.name}
						</div>
					)}

					<div className='flex justify-between items-center mt-5'>
						<div className='flex justify-center gap-1 text-text-secondary'>
							{(user.sports as Sport[])?.map((sport) => (
								<div>{SPORTS_ICONS[sport.code]}</div>
							))}
						</div>

						<Rating rating={4} />
					</div>
				</div>
			</div>
		</Card>
	);
}

export default UserCard;
