'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

interface Props {
	children: React.ReactNode;
	trigger: React.ReactNode;
	position?: 'left' | 'right';
	className?: string;
	containerClassName?: string;
}

export const Dropdown = ({
	children,
	trigger,
	position = 'right',
	className,
	containerClassName,
}: Props) => {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useOutsideClick(ref, () => setOpen(false));

	return (
		<div ref={ref} className={twMerge('relative', className)}>
			<div onClick={() => setOpen(!open)} className={containerClassName}>
				{trigger}
			</div>

			{open && (
				<Card
					className={twMerge(
						'px-0 py-2 z-10 min-w-max text-medium text-left shadow-lg shadow-neutral-200 mt-1 m-0 bg-clip-padding border-none absolute',
						position === 'left' ? 'left-0' : 'right-0'
					)}
					onClick={() => setOpen(false)}
				>
					{children}
				</Card>
			)}
		</div>
	);
};

export default Dropdown;
