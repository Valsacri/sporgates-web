import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';

function ProfileNavigation() {
	return (
		<Card className='flex justify-between'>
			<Button icon='document' className='w-full rounded-full'>
				Timeline
			</Button>
			<Button icon='heart' className='w-full rounded-full'>
				Likes
			</Button>
			<Button icon='two-user' className='w-full rounded-full'>
				Friends
			</Button>
			<Button icon='gallery' className='w-full rounded-full'>
				Photos
			</Button>
			<Button icon='play' className='w-full rounded-full'>
				Videos
			</Button>
		</Card>
	);
}

export default ProfileNavigation;
