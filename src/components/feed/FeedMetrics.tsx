import Image from 'next/image';
import Card from '../utils/Card';
import Avatar from '../utils/Avatar';

function FeedMetrics() {
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

				<div className='text-center mt-5'>
					<h2>Oussama Khalfi</h2>
					<p className='text-sm'>@oussamakhalfi</p>
					<div className='flex justify-center gap-5 mt-5'>
						<div>
							<p className='text-sm'>Following</p>
							<p className='text-lg font-bold'>63</p>
						</div>
						<div>
							<p className='text-sm'>Followers</p>
							<p className='text-lg font-bold'>74</p>
						</div>
						<div>
							<p className='text-sm'>Posts</p>
							<p className='text-lg font-bold'>22</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}

export default FeedMetrics;
