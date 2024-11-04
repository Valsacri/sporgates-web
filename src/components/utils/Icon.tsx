import { CocoIcon, CocoIcons } from '@/client/config/coco-icons';
import { twMerge } from 'tailwind-merge';

import {
	IoBasketballOutline,
	IoFootballOutline,
	IoTennisballOutline,
} from 'react-icons/io5';

export const SPORTS_ICONS = {
	football: <IoFootballOutline className='size-5' />,
	basketball: <IoBasketballOutline className='size-5' />,
	tennis: <IoTennisballOutline className='size-5' />,
} as any;

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
				className={twMerge('size-6', className)}
			>
				{CocoIcons[name]}
			</svg>
		</span>
	);
}

export default Icon;
