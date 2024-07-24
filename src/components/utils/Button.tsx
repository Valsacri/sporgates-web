import Icon from './Icon';
import { twMerge } from 'tailwind-merge';
import { CocoIcon } from '@/config/coco-icons';

type Props = {
	children?: React.ReactNode;
	className?: string;
	icon?: CocoIcon | null;
	iconClassName?: string;
	color?:
		| 'primary'
		| 'secondary'
		| 'transparent'
		| 'success'
		| 'warning'
		| 'info'
		| 'danger'
		| 'white';
	onClick?: () => any;
};

function Button({
	children,
	icon,
	className,
	iconClassName,
	color = 'transparent',
	onClick,
}: Props) {
	const colorsMap = {
		primary: 'bg-primary hover:bg-accent',
		secondary: 'bg-secondary hover:bg-secondary-dark text-text',
		transparent: 'bg-transparent hover:bg-secondary text-text',
		success: 'bg-success hover:bg-success-dark',
		warning: 'bg-warning hover:bg-warning-dark',
		info: 'bg-info hover:bg-info-dark',
		danger: 'bg-danger hover:bg-danger-dark',
		white: 'bg-white text-text hover:bg-secondary',
	};

	return (
		<button
			onClick={onClick}
			className={twMerge(
				'h-[40px] text-nowrap flex justify-center items-center gap-1 text-sm text-white transition-colors duration-150 py-2.5 rounded-md',
				children ? 'px-4' : 'w-[40px] justify-center',
				colorsMap[color],
				className
			)}
		>
			{icon && <Icon name={icon} className={iconClassName} />}
			{children}
		</button>
	);
}

export default Button;
