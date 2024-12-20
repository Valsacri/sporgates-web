'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Separator from './Separator';

export interface ListItem {
	item?: React.ReactNode;
	title?: string;
	separator?: boolean;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	className?: string;
	itemClassName?: string;
	onClick?: () => any;
	href?: string;
	selected?: boolean;
}

interface Props {
	items: ListItem[];
	className?: string;
	itemClassName?: string;
	disable?: boolean;
}

function List({ items, className, itemClassName, disable }: Props) {
	const handleClick = (e: any, onClick?: () => any) => {
		e.stopPropagation();
		if (disable) return;
		onClick?.();
	};

	return (
		<div className={twMerge('space-y-1', className)}>
			{items.map((item, i) => {
				const Component = item.href ? Link : 'div';

				return (
					<Component
						href={disable ? '#' : item.href || '#'}
						aria-disabled
						key={i}
						className={twMerge(
							'w-full px-3 block rounded-md',
							item.item && 'hover:bg-secondary cursor-pointer',
							item.selected && 'bg-secondary',
							itemClassName,
							item.className
						)}
						onClick={(e) => handleClick(e, item?.onClick)}
					>
						{item.item ? (
							<div
								className={twMerge(
									'w-full flex items-center justify-between py-3'
								)}
							>
								<div className='w-full flex items-center gap-3'>
									{item.prefix}
									{item.item}
								</div>
								{item.suffix}
							</div>
						) : item.separator ? (
							<Separator />
						) : item.title ? (
							<span className='text-xs font-medium text-text-secondary uppercase'>
								{item.title}
							</span>
						) : null}
					</Component>
				);
			})}
		</div>
	);
}

export default List;
