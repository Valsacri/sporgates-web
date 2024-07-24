import { twMerge } from 'tailwind-merge';
import Icon from '../../utils/Icon';

interface Props {
	className?: string;
}

function Status({ className }: Props) {
	return (
		<div
			className={twMerge(
				'min-w-28 h-40 rounded-xl bg-accent flex items-end justify-center relative bg-cover bg-center',
				'bg-[url(https://sporgates.com/upload/photos/d-avatar.jpg?cache=0)]',
				className
			)}
		>
			<Icon
				name='plus'
				containerClassName='bg-secondary rounded-full -mb-3'
				className='size-8'
			/>
		</div>
	);
}

export default Status;
