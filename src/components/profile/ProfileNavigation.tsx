'use client';

import { usePathname } from 'next/navigation';
import Card from '../utils/Card';
import Buttons, { ButtonItem } from './Buttons';

interface Props {
	items: (ButtonItem & { subItems?: ButtonItem[] })[];
}

function ProfileNavigation({ items }: Props) {
	const pathname = usePathname();

	const _items = items.map((item) => ({
		...item,
		selected: pathname.startsWith(item.href || ''),
	}));

	const selectedItem = _items.find((item) => item.selected);
	const subItems =
		selectedItem?.subItems?.map((item) => ({
			...item,
			selected: pathname === item.href,
		})) || [];

	return (
		<Card className='overflow-x-auto p-3'>
			<Buttons stretch items={_items} />

			{subItems.length > 0 && <hr className='my-3' />}

			<Buttons stretch items={subItems} />
		</Card>
	);
}

export default ProfileNavigation;
