'use client';

import { useOutsideClick } from '@/client/hooks/utils/useOutsideClick';
import React, { useRef, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface Props {
	children?: React.ReactElement;
	title?: React.ReactNode;
	description?: string;
	width?: string;
	open?: any;
	setOpen?: (open: boolean) => any;
	hideCloseButton?: boolean;
	onClose?: any;
	outsideClick?: boolean;
	titleSuffix?: React.ReactNode;
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
	hideCloseButton,
	onClose,
	outsideClick = true,
	titleSuffix,
	trigger,
	backdropClassName,
	triggerClassName,
	className,
}: Props) => {
	const [__open, __setOpen] = useState(false);

	const open = _open ?? __open;
	const setOpen = _setOpen ?? __setOpen;
	const _onClose = onClose ?? (() => setOpen(false));

	const ref = useRef(null);

	useOutsideClick(ref, () => {
		if (!outsideClick) {
			return;
		}
		_onClose();
	});

	return (
		<>
			{trigger && (
				<div
					onClick={() => setOpen(!open)}
					className={twMerge('cursor-pointer', triggerClassName)}
				>
					{trigger}
				</div>
			)}

			{open && (
				<div
					className={twMerge(
						'fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center py-10',
						backdropClassName
					)}
				>
					<div
						ref={ref}
						className={twMerge(
							'max-h-full overflow-auto mx-3 bg-white rounded-md p-4 space-y-3 border w-full lg:w-1/2',
							className
						)}
					>
						{(title || titleSuffix || !hideCloseButton) && (
							<div className='space-y-1'>
								<div className='flex justify-between'>
									<h2>{title}</h2>

									<div className='flex gap-3'>
										{titleSuffix}
										{!hideCloseButton && (
											<Button
												icon={<HiX className='size-5 cursor-pointer' />}
												className='bg-opacity-0 p-1 h-min w-min'
												onClick={_onClose}
											/>
										)}
									</div>
								</div>

								{description && (
									<p className='text-sm mb-3 text-text-secondary-dark'>
										{description}
									</p>
								)}
							</div>
						)}
						{children && React.cloneElement(children, { onClose: _onClose })}
					</div>
				</div>
			)}
		</>
	);
};
