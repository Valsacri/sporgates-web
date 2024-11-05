import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';

function Page() {
	return (
		<Card title='General settings' bodyClassName='grid grid-cols-2 gap-3'>
			<Input label='First name' placeholder='First name' />
			<Input label='Last name' placeholder='Last name' />
			<Input label='Username' placeholder='Username' />
			<Input label='Email' placeholder='Email' />
			<Input label='Phone number' placeholder='Phone number' />
		</Card>
	);
}

export default Page;
