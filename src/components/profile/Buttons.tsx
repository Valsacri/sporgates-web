'use client';

import Button from '@/components/utils/Button';
import { CocoIcon } from '@/client/config/coco-icons';
import { Color } from '@/client/types/general.types';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export interface ButtonItem {
	text: string;
	icon?: CocoIcon;
	href?: string;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
	color?: Color;
	selected?: boolean;
}

interface Props {
	items: ButtonItem[];
	buttonClassName?: string;
	className?: string;
	stretch?: boolean;
	color?: Color;
	selectedColor?: Color;
}

function Buttons({
	items,
	buttonClassName,
	className,
	stretch,
	color = 'transparent',
	selectedColor = 'primary',
}: Props) {
	const router = useRouter();

	const handleClick = (item: ButtonItem) => {
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
				stretch && 'justify-between',
				className
			)}
		>
			{items.map((item, index) => {
				const Component = item.href ? Link : 'div';
				return (
					<Component
						href={item.href as any}
						className={twMerge(stretch && 'w-full')}
					>
						<Button
							key={index}
							icon={item.icon as CocoIcon}
							color={item.selected ? selectedColor : item.color || color}
							variant={item.selected ? 'outlined' : 'filled'}
							className={twMerge(
								'w-full rounded-full',
								buttonClassName,
								item.className
							)}
							disableHover={item.selected}
							onClick={() => handleClick(item)}
							disabled={item.disabled}
						>
							{item.text}
						</Button>
					</Component>
				);
			})}
		</div>
	);
}

export default Buttons;
