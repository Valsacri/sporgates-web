import HomeNavigation from '@/components/home/HomeNavigation';
import PageNavigation from '@/components/profile/PageNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';

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

				<PageNavigation />

				{children}
			</div>
		</div>
	);
}
