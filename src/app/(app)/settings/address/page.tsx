import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';

function Page() {
	return (
		<Card title='Address settings'>
			<div className='grid grid-cols-2 gap-3 items-end'>
				<Input
					label='New password'
					placeholder='Enter a new password'
					className='col-span-2 lg:col-span-1'
				/>
				<Input
					label='Password confiramtion'
					placeholder='Confirm your password'
					className='col-span-2 lg:col-span-1'
				/>
				<Button className='col-span-12 lg:col-span-2' color='primary'>
					Save
				</Button>
			</div>
		</Card>
	);
}

export default Page;
