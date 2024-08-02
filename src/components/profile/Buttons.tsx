'use client';

import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { CocoIcon } from '@/config/coco-icons';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type Item = {
	icon: CocoIcon;
	text: string;
	href?: string;
	onClick?: () => void;
};

interface Props {
	items: Item[];
	buttonClassName?: string;
	containerClassName?: string;
	stretch?: boolean;
}

function Buttons({
	items,
	buttonClassName,
	containerClassName,
	stretch,
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
				'flex',
				stretch && 'lg:justify-between',
				containerClassName
			)}
		>
			{items.map((item, index) => (
				<Button
					key={index}
					icon={item.icon as CocoIcon}
					color='transparent'
					className={twMerge(
						'rounded-full',
						stretch && 'lg:w-full',
						buttonClassName
					)}
					onClick={() => handleClick(item)}
				>
					{item.text}
				</Button>
			))}
		</div>
	);
}

export default Buttons;
