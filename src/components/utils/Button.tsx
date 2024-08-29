import Icon from './Icon';
import { twMerge } from 'tailwind-merge';
import { CocoIcon } from '@/client/config/coco-icons';
import { Color } from '@/client/types/general.types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Loader from './Loader';

type Props = {
	children?: React.ReactNode;
	className?: string;
	icon?: CocoIcon | JSX.Element | null;
	iconClassName?: string;
	color?: Color;
	variant?: 'filled' | 'outlined';
	onClick?: () => any;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	loading?: boolean;
	onMouseEnter?: () => void;
};

function Button({
	children,
	icon,
	className,
	iconClassName,
	color = 'transparent',
	variant = 'filled',
	onClick,
	type = 'button',
	disabled,
	loading,
	onMouseEnter
}: Props) {
	const baseStyles =
		'h-[40px] text-nowrap flex justify-center items-center gap-1 text-sm transition-colors duration-150 py-2.5 rounded-md';
	const paddingStyles = children ? 'px-4' : 'w-[40px] justify-center';

	const colorsMap = {
		primary: 'bg-primary hover:bg-primary-dark text-white',
		accent: 'bg-accent hover:bg-accent-dark text-white',
		secondary: 'bg-secondary hover:bg-secondary-dark',
		transparent: 'bg-transparent hover:bg-secondary',
		success: 'bg-success hover:bg-success-dark text-white',
		warning: 'bg-warning hover:bg-warning-dark',
		info: 'bg-info hover:bg-info-dark text-white',
		danger: 'bg-danger hover:bg-danger-dark text-white',
		white: 'bg-white text-text hover:bg-secondary',
	};

	const outlinedColorsMap = {
		primary:
			'border border-primary text-primary hover:bg-primary hover:text-white',
		accent: 'border border-accent text-accent hover:bg-accent hover:text-white',
		secondary:
			'border border-secondary text-secondary hover:bg-secondary hover:text-white',
		transparent: 'border border-transparent text-text hover:bg-secondary',
		success:
			'border border-success text-success hover:bg-success hover:text-white',
		warning:
			'border border-warning text-warning hover:bg-warning hover:text-white',
		info: 'border border-info text-info hover:bg-info hover:text-white',
		danger: 'border border-danger text-danger hover:bg-danger hover:text-white',
		white: 'border border-white text-white hover:bg-white hover:text-black',
	};

	const variantStyles =
		variant === 'outlined' ? outlinedColorsMap[color] : colorsMap[color];

	return (
		<button
			type={type}
			onClick={onClick}
			className={twMerge(
				baseStyles,
				paddingStyles,
				disabled ? 'opacity-50 cursor-not-allowed' : variantStyles,
				className
			)}
			disabled={disabled || loading}
			onMouseEnter={onMouseEnter}
		>
			{loading ? <Loader className='mr-1' /> : null}

			{typeof icon === 'string' ? (
				<Icon name={icon} className={iconClassName} />
			) : (
				icon
			)}
			{children}
		</button>
	);
}

export default Button;
