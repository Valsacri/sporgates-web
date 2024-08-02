import { CocoIcon, CocoIcons } from '@/config/coco-icons';
import { twMerge } from 'tailwind-merge';

interface Props {
	name: CocoIcon;
	className?: string;
	containerClassName?: string;
}

function Icon({ name, className, containerClassName }: Props) {
	return (
		<span className={containerClassName}>
			<svg
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className={twMerge('size-5 lg:size-6', className)}
			>
				{CocoIcons[name]}
			</svg>
		</span>
	);
}

export default Icon;
