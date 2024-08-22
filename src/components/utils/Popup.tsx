'use client';

import { useOutsideClick } from '@/client/hooks/utils/useOutsideClick';
import { useRef, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

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
					'fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center py-10',
					backdropClassName
				)}
			>
				<div
					ref={ref}
					className={twMerge(
						'max-h-full overflow-auto mx-5 bg-white rounded-lg p-5',
						className
					)}
				>
					<div className='flex justify-between'>
						<div className='h3 mb-2'>{title}</div>
						<div className='flex gap-3'>
							{topRightSection}
							{showCloseButton && (
								<HiX className='size-5 cursor-pointer' onClick={onClose} />
							)}
						</div>
					</div>
					{description && <p className='t1 mb-7'>{description}</p>}
					{children}
				</div>
			</div>
		</>
	);
};
