import Icon from './Icon';
import { twMerge } from 'tailwind-merge';
import { CocoIcon } from '@/client/config/coco-icons';
import { Color } from '@/client/types/general.types';
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
	disableHover?: boolean;
	loading?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
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
	disableHover,
	loading,
	onMouseEnter,
	onMouseLeave,
}: Props) {
	const baseStyles =
		'h-[40px] text-nowrap flex justify-center items-center gap-1 text-sm transition-colors duration-150 py-2.5 rounded-md';
	const paddingStyles = children ? 'px-4' : 'w-[40px] justify-center';

	// Adjust color maps to conditionally exclude hover effects if disableHover is true
	const colorsMap = {
		primary: `bg-primary text-white ${
			disableHover ? '' : 'hover:bg-primary-dark'
		}`,
		accent: `bg-accent text-white ${
			disableHover ? '' : 'hover:bg-accent-dark'
		}`,
		secondary: `bg-secondary ${disableHover ? '' : 'hover:bg-secondary-dark'}`,
		transparent: `bg-transparent ${disableHover ? '' : 'hover:bg-secondary'}`,
		success: `bg-success text-white ${
			disableHover ? '' : 'hover:bg-success-dark'
		}`,
		warning: `bg-warning ${disableHover ? '' : 'hover:bg-warning-dark'}`,
		info: `bg-info text-white ${disableHover ? '' : 'hover:bg-info-dark'}`,
		danger: `bg-danger text-white ${
			disableHover ? '' : 'hover:bg-danger-dark'
		}`,
		white: `bg-white text-text ${disableHover ? '' : 'hover:bg-secondary'}`,
	};

	const outlinedColorsMap = {
		primary: `border border-primary text-primary ${
			disableHover ? '' : 'hover:bg-primary hover:text-white'
		}`,
		accent: `border border-accent text-accent ${
			disableHover ? '' : 'hover:bg-accent hover:text-white'
		}`,
		secondary: `border border-secondary text-secondary ${
			disableHover ? '' : 'hover:bg-secondary hover:text-white'
		}`,
		transparent: `border border-transparent text-text ${
			disableHover ? '' : 'hover:bg-secondary'
		}`,
		success: `border border-success text-success ${
			disableHover ? '' : 'hover:bg-success hover:text-white'
		}`,
		warning: `border border-warning text-warning ${
			disableHover ? '' : 'hover:bg-warning hover:text-white'
		}`,
		info: `border border-info text-info ${
			disableHover ? '' : 'hover:bg-info hover:text-white'
		}`,
		danger: `border border-danger text-danger ${
			disableHover ? '' : 'hover:bg-danger hover:text-white'
		}`,
		white: `border border-white text-white ${
			disableHover ? '' : 'hover:bg-white hover:text-black'
		}`,
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
			onMouseLeave={onMouseLeave}
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
