// List.tsx
'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ListProps {
	children?: ReactNode;
	className?: string;
	horizontal?: boolean;
}

function List2({ children, className, horizontal = false }: ListProps) {
	return (
		<div
			className={twMerge(
				horizontal ? 'space-x-1' : 'space-y-1',
				horizontal && 'flex flex-row',
				className
			)}
		>
			{children}
		</div>
	);
}

export default List2;
