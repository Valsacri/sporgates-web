import Avatar from '@/components/utils/Avatar';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/Input';

function CreatePost() {
	return (
		<Card className='space-y-5'>
			<div className='flex flex-col lg:flex-row gap-3'>
				<div className='w-full flex gap-3'>
					<Avatar
						src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
						size={40}
					/>
					<Input
						placeholder='What is on your mind?'
						name='post'
						className='lg:w-full'
					/>
				</div>

				<Button className='w-full lg:w-max' color='primary'>
					Create post
				</Button>
			</div>

			<div className='flex gap-3 overflow-x-auto'>
				<Button icon='gallery' className='rounded-full'>
					Upload image
				</Button>
				<Button icon='todo' className='rounded-full'>
					Create poll
				</Button>
				<Button icon='play' className='rounded-full'>
					Upload video
				</Button>
				<Button icon='add' className='rounded-full'>
					More
				</Button>
			</div>
		</Card>
	);
}

export default CreatePost;
