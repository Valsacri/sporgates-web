'use client';

import { usePathname } from 'next/navigation';
import Card from '../utils/Card';
import Buttons, { ButtonItem } from './Buttons';
import Separator from '../utils/Separator';

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
		<Card className='overflow-x-auto p-1'>
			<Buttons stretch items={_items} buttonClassName='rounded-md' />

			{subItems.length > 0 && <Separator />}

			<Buttons stretch items={subItems} buttonClassName='rounded-md' />
		</Card>
	);
}

export default ProfileNavigation;
