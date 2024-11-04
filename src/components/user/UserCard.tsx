import Image from 'next/image';
import Card from '../utils/Card';
import Avatar from '../utils/Avatar';
import Rating from '../shared/Rating';
import Icon, { SPORTS_ICONS } from '../utils/Icon';

function UserCard() {
	return (
		<Card className='p-0 pb-5'>
			<Image
				src='https://sporgates.com/upload/photos/d-cover.jpg?cache=0'
				width={1000}
				height={300}
				alt=''
				className='rounded-t-lg'
			/>

			<div className='-mt-12'>
				<div>
					<Avatar
						src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
						size={100}
						className='border-white mx-auto'
					/>
				</div>

				<div className='text-center mt-3 px-5'>
					<h2>Oussama Khalfi</h2>
					<span className='text-sm text-text-secondary'>@oussamakhalfi</span>
					<p className='text-sm mt-2 text-text-secondary-dark'>
						Brushing your teeth is the only time you're cleaning your skull
					</p>

					<div className='flex gap-1 justify-center items-center text-xs text-text-secondary mt-3'>
						<Icon name='location' className='!size-5' /> Maarif, Casablanca
					</div>

					<div className='flex justify-between items-center mt-5'>
						<div className='flex justify-center gap-1 text-text-secondary'>
							{[{ code: 'football' }, { code: 'basketball' }].map((sport) => (
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
