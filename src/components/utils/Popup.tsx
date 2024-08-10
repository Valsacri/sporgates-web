'use client';

import { useOutsideClick } from '@/hooks/utils/useOutsideClick';
import { useRef } from 'react';
import { HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

interface Props {
	children?: React.ReactNode;
	title?: React.ReactNode;
	description?: string;
	width?: string;
	open?: boolean;
	showCloseButton?: boolean;
	onClose?: any;
	outsideClick?: boolean;
	topRightSection?: React.ReactNode;
	backdropClassName?: string;
	className?: string;
}

export const Popup = ({
	children,
	title,
	description,
	open,
	showCloseButton = true,
	onClose,
	outsideClick = true,
	topRightSection,
	backdropClassName,
	className,
}: Props) => {
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
		<div
			className={twMerge(
				'fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center py-10',
				backdropClassName
			)}
		>
			<div
				ref={ref}
				// className={`w-full max-h-full overflow-auto sm:w-2/3 2xl:w-3/5 mx-5 bg-white rounded-lg p-5`}
				className={twMerge(
					'max-h-full overflow-auto mx-5 bg-white rounded-lg p-5',
					className
				)}
			>
				<div className='flex justify-between'>
					<div className='h3 mb-2 uppercase'>{title}</div>
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
	);
};
