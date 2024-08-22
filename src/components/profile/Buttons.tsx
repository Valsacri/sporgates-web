'use client';

import Button from '@/components/utils/Button';
import { CocoIcon } from '@/client/config/coco-icons';
import { Color } from '@/client/types/general.types';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type Item = {
	text: string;
	icon?: CocoIcon;
	href?: string;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
	color?: Color;
	selected?: boolean;
};

interface Props {
	items: Item[];
	buttonClassName?: string;
	containerClassName?: string;
	stretch?: boolean;
	color?: Color;
	selectedColor?: Color;
}

function Buttons({
	items,
	buttonClassName,
	containerClassName,
	stretch,
	color = 'transparent',
	selectedColor = 'primary',
}: Props) {
	const router = useRouter();

	const handleClick = (item: Item) => {
		if (item.href) {
			router.push(item.href);
		} else if (item.onClick) {
			item.onClick();
		}
	};

	return (
		<div
			className={twMerge(
				'flex gap-3',
				stretch && 'lg:justify-between',
				containerClassName
			)}
		>
			{items.map((item, index) => (
				<Button
					key={index}
					icon={item.icon as CocoIcon}
					color={item.selected ? selectedColor : item.color || color}
					className={twMerge(
						'rounded-full',
						stretch && 'lg:w-full',
						buttonClassName,
						item.className
					)}
					onClick={() => handleClick(item)}
					disabled={item.disabled}
				>
					{item.text}
				</Button>
			))}
		</div>
	);
}

export default Buttons;
