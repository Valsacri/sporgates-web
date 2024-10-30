'use client';

import { usePathname } from 'next/navigation';
import Card from '../utils/Card';
import Buttons, { ButtonItem } from './Buttons';

interface Props {
	items: ButtonItem[];
}

function ProfileNavigation({ items }: Props) {
	const pathname = usePathname();

	const _items = items.map((item) => ({
		...item,
		selected: pathname === item.href,
	}));

	return (
		<Card className='overflow-x-auto'>
			<Buttons stretch items={_items} />
		</Card>
	);
}

export default ProfileNavigation;
