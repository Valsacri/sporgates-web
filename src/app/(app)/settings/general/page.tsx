import { Input } from '@/components/utils/form/Input';

function Page() {
	return (
		<div className='grid grid-cols-2 gap-3'>
			<Input label='First name' />
			<Input label='Last name' />
			<Input label='Username' />
			<Input label='Email' />
			<Input label='Phone number' />
		</div>
	);
}

export default Page;
