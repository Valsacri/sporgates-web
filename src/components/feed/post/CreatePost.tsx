import Buttons from '@/components/profile/Buttons';
import Avatar from '@/components/utils/Avatar';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';

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

			<div className='overflow-x-auto'>
				<Buttons
					items={[
						{ icon: 'gallery', text: 'Upload image', href: '' },
						{ icon: 'todo', text: 'Create poll', href: '' },
						{ icon: 'play', text: 'Upload video', href: '' },
						{ icon: 'add', text: 'More', href: '' },
					]}
				/>
			</div>
		</Card>
	);
}

export default CreatePost;
