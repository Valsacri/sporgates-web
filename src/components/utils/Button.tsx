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
	variant?: 'filled' | 'outlined';
	onClick?: () => any;
};

function Button({
	children,
	icon,
	className,
	iconClassName,
	color = 'transparent',
	variant = 'filled',
	onClick,
}: Props) {
	const baseStyles = 'h-[40px] text-nowrap flex justify-center items-center gap-1 text-sm transition-colors duration-150 py-2.5 rounded-md';
	const paddingStyles = children ? 'px-4' : 'w-[40px] justify-center';

	const colorsMap = {
		primary: 'bg-primary hover:bg-primary-dark text-white',
		secondary: 'bg-secondary hover:bg-secondary-dark text-text',
		transparent: 'bg-transparent hover:bg-secondary text-text',
		success: 'bg-success hover:bg-success-dark',
		warning: 'bg-warning hover:bg-warning-dark',
		info: 'bg-info hover:bg-info-dark',
		danger: 'bg-danger hover:bg-danger-dark',
		white: 'bg-white text-text hover:bg-secondary',
	};

	const outlinedColorsMap = {
		primary: 'border border-primary text-primary hover:bg-primary hover:text-white',
		secondary: 'border border-secondary text-secondary hover:bg-secondary hover:text-white',
		transparent: 'border border-transparent text-text hover:bg-secondary',
		success: 'border border-success text-success hover:bg-success hover:text-white',
		warning: 'border border-warning text-warning hover:bg-warning hover:text-white',
		info: 'border border-info text-info hover:bg-info hover:text-white',
		danger: 'border border-danger text-danger hover:bg-danger hover:text-white',
		white: 'border border-white text-white hover:bg-white hover:text-black',
	};

	const variantStyles = variant === 'outlined' ? outlinedColorsMap[color] : colorsMap[color];

	return (
		<button
			onClick={onClick}
			className={twMerge(baseStyles, paddingStyles, variantStyles, className)}
		>
			{icon && <Icon name={icon} className={iconClassName} />}
			{children}
		</button>
	);
}

export default Button;
