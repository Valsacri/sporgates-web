import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';

function Page() {
	return (
		<Card title='Security settings' bodyClassName='grid grid-cols-12 gap-3 items-end'>
			<Input
				label='New password'
				placeholder='Enter a new password'
				className='col-span-12 lg:col-span-5'
			/>
			<Input
				label='Password confiramtion'
				placeholder='Confirm your password'
				className='col-span-12 lg:col-span-5'
			/>
			<Button className='col-span-12 lg:col-span-2' color='primary'>Save</Button>
		</Card>
	);
}

export default Page;
