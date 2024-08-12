'use client';

import { useForm } from 'react-hook-form';
import { Popup } from '../utils/Popup';
import { Input } from '../utils/Input';
import Button from '../utils/Button';
import { usePopup } from '@/hooks/utils/usePopup';

interface Props {
	children?: React.ReactNode;
}

function ManageSubscriptionFeaturePopup({ children }: Props) {
	const [isOpen, toggleOpen] = usePopup();
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			description: '',
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
		reset();
		toggleOpen();
	};

	return (
		<>
			<div onClick={toggleOpen}>{children}</div>

			<Popup
				open={isOpen}
				title='Add a feature'
				description='Fill in the details to add a new feature.'
				onClose={toggleOpen}
				className='w-full lg:w-1/4'
			>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
					<div className='space-y-3'>
						<Input
							{...register('description')}
							placeholder='Description'
							rows={5}
						/>
					</div>

					<div className='flex justify-end gap-3'>
						<Button color='secondary' onClick={toggleOpen}>
							Close
						</Button>
						<Button type='submit' color='primary'>
							Add
						</Button>
					</div>
				</form>
			</Popup>
		</>
	);
}

export default ManageSubscriptionFeaturePopup;
