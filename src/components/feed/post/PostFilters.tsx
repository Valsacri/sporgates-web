import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';

function PostFilters() {
	return (
		<Card className='flex justify-between'>
			<Button icon='card' />
			<Button icon='note' />
			<Button icon='gallery' />
			<Button icon='send' />
			<Button icon='mic' />
			<Button icon='document' />
			<Button icon='location' />
		</Card>
	);
}

export default PostFilters;
