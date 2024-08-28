import { Color } from '@/client/types/general.types';
import { twMerge } from 'tailwind-merge';

interface Props {
	color?: Color;
	className?: string;
}

const Loader = ({ color = 'primary', className }: Props) => {
	const borderColorMap = {
		primary: 'border-t-primary border-r-primary',
		accent: 'border-t-accent border-r-accent',
		secondary: 'border-t-secondary border-r-secondary',
		transparent: 'border-t-transparent border-r-transparent',
		success: 'border-t-success border-r-success',
		warning: 'border-t-warning border-r-warning',
		info: 'border-t-info border-r-info',
		danger: 'border-t-danger border-r-danger',
		white: 'border-t-white border-r-white',
	};

	return (
		<div className={twMerge('relative size-5', className)}>
			<div className='absolute inset-0 rounded-full border-2 border-gray-300'></div>
			<div
				className={twMerge(
					'absolute inset-0 border-2 border-transparent rounded-full animate-animation-spin',
					borderColorMap[color]
				)}
			></div>
		</div>
	);
};

export default Loader;
