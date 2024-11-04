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
}

interface Props {
	items: ListItem[];
	className?: string;
	itemClassName?: string;
}

function List({ items, className, itemClassName }: Props) {
	const handleClick = (e: any, onClick?: () => any) => {
		e.stopPropagation();
		onClick?.();
	};

	return (
		<div className={twMerge(className)}>
			{items.map((item, i) => {
				const Component = item.href ? Link : 'div';

				return (
					<Component
						href={item?.href as any}
						aria-disabled
						key={i}
						className={twMerge(
							'w-full px-3 block',
							item.item && 'hover:bg-secondary cursor-pointer',
							'rounded-md',
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
							<span className='text-xs font-medium text-text-secondary uppercase'>{item.title}</span>
						) : null}
					</Component>
				);
			})}
		</div>
	);
}

export default List;
