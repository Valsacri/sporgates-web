'use client';

import { useOutsideClick } from '@/client/hooks/utils/useOutsideClick';
import { useRef, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface Props {
	children?: React.ReactNode;
	title?: React.ReactNode;
	description?: string;
	width?: string;
	open?: boolean;
	setOpen?: (open: boolean) => any;
	showCloseButton?: boolean;
	onClose?: any;
	outsideClick?: boolean;
	topRightSection?: React.ReactNode;
	trigger?: React.ReactNode;
	backdropClassName?: string;
	triggerClassName?: string;
	className?: string;
}

export const Popup = ({
	children,
	title,
	description,
	open: _open,
	setOpen: _setOpen,
	showCloseButton = true,
	onClose,
	outsideClick = true,
	topRightSection,
	trigger,
	backdropClassName,
	triggerClassName,
	className,
}: Props) => {
	const [__open, __setOpen] = useState(false);

	const open = _open ?? __open;
	const setOpen = _setOpen ?? __setOpen;

	const ref = useRef(null);

	useOutsideClick(ref, () => {
		if (!outsideClick) {
			return;
		}
		onClose();
	});

	if (!open) {
		return;
	}

	return (
		<>
			<div
				onClick={() => setOpen(!open)}
				className={twMerge('cursor-pointer', triggerClassName)}
			>
				{trigger}
			</div>

			<div
				className={twMerge(
					'fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center py-10',
					backdropClassName
				)}
			>
				<div
					ref={ref}
					className={twMerge(
						'max-h-full overflow-auto mx-5 bg-white rounded-md p-5',
						className
					)}
				>
					<div className='flex justify-between mb-5'>
						<div className='space-y-1'>
							<div className='h3'>{title}</div>
							{description && (
								<p className='text-sm mb-3 text-text-secondary-dark'>
									{description}
								</p>
							)}
						</div>
						<div className='flex gap-3'>
							{topRightSection}
							{showCloseButton && (
								<Button
									icon={<HiX className='size-5 cursor-pointer' />}
									className='bg-opacity-0 p-1 h-min w-min'
									onClick={onClose}
								/>
							)}
						</div>
					</div>
					{children}
				</div>
			</div>
		</>
	);
};
