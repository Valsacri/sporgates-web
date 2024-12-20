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
	xPosition?: 'left' | 'right';
	yPosition?: 'top' | 'bottom';
	xInside?: boolean;
	yInside?: boolean;
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
	xPosition = 'right',
	yPosition = 'bottom',
	xInside = false,
	yInside = false,
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
		<div
			ref={ref}
			className={twMerge('relative overflow-visible z-50', containerClassName)}
		>
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
						'absolute p-1 min-w-max text-medium text-left m-0 bg-clip-padding',
						xPosition === 'left' ? 'left-0' : 'right-0',
						yPosition === 'top'
							? yInside
								? 'top-0'
								: 'bottom-full mb-1'
							: 'top-full mt-1',

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
