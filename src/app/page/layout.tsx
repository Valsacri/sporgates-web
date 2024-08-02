import HomeNavigation from '@/components/home/HomeNavigation';
import Buttons from '@/components/profile/Buttons';
import ProfileInfos from '@/components/profile/ProfileInfos';
import Card from '@/components/utils/Card';

interface Props {
	children: React.ReactNode;
}

export default function Page({ children }: Props) {
	return (
		<div className='flex gap-5'>
			<div className='hidden lg:block w-1/4'>
				<HomeNavigation />
			</div>

			<div className='w-full lg:w-4/5 space-y-5'>
				<ProfileInfos type='page' />

				<Card className='overflow-x-auto'>
					<Buttons
						stretch
						items={[
							{ icon: 'gallery', text: 'Gallery', href: '/page/gallery' },
							{ icon: 'location', text: 'Grounds', href: '/page/grounds' },
							{ icon: 'todo', text: 'Services', href: '' },
						]}
					/>
				</Card>

				{children}
			</div>
		</div>
	);
}
