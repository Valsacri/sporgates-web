'use client';

import { twMerge } from 'tailwind-merge';

export interface ListItem {
	item: React.ReactNode;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	className?: string;
	onClick?: () => any;
}

interface Props {
	items: (ListItem | null)[];
	className?: string;
}

function List({ items, className }: Props) {
	const handleClick = (
		e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
		onClick?: () => any
	) => {
		e.stopPropagation();
		onClick?.();
	};

	return (
		<div className={twMerge(className)}>
			{items.map((item, i) => (
				<div
					key={i}
					className={twMerge(
						'py-3 px-6',
						item && 'hover:bg-secondary cursor-pointer',
						i === 0 && 'rounded-t-xl',
						i === items.length - 1 && 'rounded-b-xl',
						item?.className
					)}
					onClick={(e) => handleClick(e, item?.onClick)}
				>
					{item?.item ? (
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								{item.prefix}
								{item.item}
							</div>
							{item.suffix}
						</div>
					) : (
						<hr />
					)}
				</div>
			))}
		</div>
	);
}

export default List;
