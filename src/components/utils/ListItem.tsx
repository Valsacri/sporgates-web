// ListItem.tsx
'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Separator from './Separator';

export interface ListItemProps {
	children?: React.ReactNode;
	title?: string;
	separator?: boolean;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	containerClassName?: string;
	className?: string;
	onClick?: () => any;
	href?: string | null;
	selected?: boolean;
	disabled?: boolean;
	allowEventPropagation?: boolean;
}

function ListItem({
	children,
	title,
	separator,
	prefix,
	suffix,
	containerClassName,
	className,
	onClick,
	href,
	selected,
	disabled,
	allowEventPropagation,
}: ListItemProps) {
	const Component = href ? Link : 'div';

	const handleClick = (e: React.MouseEvent) => {
		if (!allowEventPropagation) {
			e.stopPropagation();
		}
		if (disabled) return;
		onClick?.();
	};

	return (
		<Component
			href={disabled ? '#' : href || '#'}
			aria-disabled={disabled}
			className={twMerge(
				'w-full px-3 block rounded-md hover:bg-secondary cursor-pointer',
				selected && 'bg-secondary',
				containerClassName
			)}
			onClick={(e) => handleClick(e)}
		>
			{children || prefix || suffix ? (
				<div className='w-full flex items-center justify-between py-3'>
					<div className={twMerge('w-full flex items-center gap-3', className)}>
						{prefix}
						{children}
					</div>
					{suffix}
				</div>
			) : separator ? (
				<Separator />
			) : title ? (
				<span className='text-xs font-medium text-text-secondary uppercase'>
					{title}
				</span>
			) : null}
		</Component>
	);
}

export default ListItem;
