import HomeNavigation from '@/components/home/HomeNavigation';
import Buttons from '@/components/profile/Buttons';
import PageNavigation from '@/components/profile/PageNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';
import Card from '@/components/utils/Card';
import { headers } from 'next/headers';

interface Props {
	children: React.ReactNode;
	params: { id: string };
}

export default function Page({ children, params }: Props) {
	const pathname = headers().get('x-pathname');
	console.log('pathname', pathname);
	return (
		<div className='flex gap-5'>
			<div className='hidden lg:block w-1/4'>
				<HomeNavigation />
			</div>

			<div className='w-full lg:w-4/5 space-y-5'>
				<ProfileInfos type='page' />

				<PageNavigation />

				{children}
			</div>
		</div>
	);
}
