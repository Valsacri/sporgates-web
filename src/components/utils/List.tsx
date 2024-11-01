'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export interface ListItem {
	item: React.ReactNode;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	className?: string;
	itemClassName?: string;
	onClick?: () => any;
	href?: string;
}

interface Props {
	items: (ListItem | null)[];
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
				const Component = item?.href ? Link : 'div';

				return (
					<Component
						href={item?.href as any}
						aria-disabled
						key={i}
						className={twMerge(
							'px-5 block',
							item && 'hover:bg-secondary cursor-pointer',
							i === 0 && 'rounded-t-xl',
							i === items.length - 1 && 'rounded-b-xl',
							itemClassName,
							item?.className
						)}
						onClick={(e) => handleClick(e, item?.onClick)}
					>
						{item?.item ? (
							<div
								className={twMerge('flex items-center justify-between py-4')}
							>
								<div className='flex items-center gap-3'>
									{item.prefix}
									{item.item}
								</div>
								{item.suffix}
							</div>
						) : (
							<hr />
						)}
					</Component>
				);
			})}
		</div>
	);
}

export default List;
