'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

interface Props {
	children: React.ReactNode;
	trigger: React.ReactNode;
	position?: 'left' | 'right';
	closeOnClick?: boolean;
	className?: string;
	containerClassName?: string;
	triggerClassName?: string;
}

export const Dropdown = ({
	children,
	trigger,
	position = 'right',
	closeOnClick,
	className,
	containerClassName,
	triggerClassName,
}: Props) => {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useOutsideClick(ref, () => setOpen(false));

	const handleClick = () => {
		console.log('11111111');
		if (closeOnClick) {
			setOpen(false);
		}
	};

	return (
		<div ref={ref} className={twMerge('relative', containerClassName)}>
			<div
				onClick={() => setOpen(!open)}
				className={twMerge('cursor-pointer', triggerClassName)}
			>
				{trigger}
			</div>

			{open && (
				<Card
					className={twMerge(
						'p-0 z-10 min-w-max text-medium text-left shadow-lg shadow-neutral-200 mt-1 m-0 bg-clip-padding border-none absolute',
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
