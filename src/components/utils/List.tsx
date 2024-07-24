'use client';

import { twMerge } from 'tailwind-merge';

export interface ListItem {
	item: React.ReactNode;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	onClick?: () => any;
}

interface Props {
	items: (ListItem | null)[];
	itemContainerClassName?: string;
}

function List({ items, itemContainerClassName }: Props) {
	const handleClick = (
		e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
		onClick?: () => any
	) => {
		e.stopPropagation();
		onClick?.();
	};

	return items.map((item, i) => (
		<div
			key={i}
			className={twMerge(
				'py-3 px-6',
				item && 'hover:bg-secondary cursor-pointer',
				itemContainerClassName
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
	));
}

export default List;
