'use client';

import { useOutsideClick } from '@/client/hooks/utils/useOutsideClick';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

interface Props {
	open?: boolean;
	setOpen?: (open: boolean) => any;
	children?: React.ReactNode;
	trigger?: React.ReactNode;
	position?: 'left' | 'right';
	closeOnClick?: boolean;
	className?: string;
	containerClassName?: string;
	triggerClassName?: string;
	disabled?: boolean;
}

export const Dropdown = ({
	open: _open,
	setOpen: _setOpen,
	children,
	trigger,
	position = 'right',
	closeOnClick,
	className,
	containerClassName,
	triggerClassName,
	disabled,
}: Props) => {
	const [__open, __setOpen] = useState(false);

	const open = _open ?? __open;
	const setOpen = _setOpen ?? __setOpen;

	const ref = useRef(null);

	useOutsideClick(ref, () => setOpen(false));

	const handleClick = () => {
		if (closeOnClick) {
			setOpen(false);
		}
	};

	return (
		<div ref={ref} className={twMerge('relative', containerClassName)}>
			{trigger && (
				<div
					onClick={() => !disabled && setOpen(!open)}
					className={twMerge('cursor-pointer', triggerClassName)}
				>
					{trigger}
				</div>
			)}

			{open && (
				<Card
					className={twMerge(
						'absolute p-0 z-10 min-w-max text-medium text-left mt-1 m-0 bg-clip-padding border-none',
						position === 'left' ? 'left-0' : 'right-0',
						className
					)}
					onClick={handleClick}
				>
					{children}
				</Card>
			)}
		</div>
	);
};

export default Dropdown;
