import HomeNavigation from '@/components/home/HomeNavigation';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';
import { redirect } from 'next/navigation';
import { HttpHelper } from '@/server/helpers/http.helper';
import { BusinessServerService } from '@/server/services/business.server-service';

interface Props {
	children: React.ReactNode;
	params: { businessId: string };
}

export default async function Layout({
	children,
	params: { businessId },
}: Props) {
	const pathname = HttpHelper.getPathname();

	const business = await BusinessServerService.getOne(businessId);
	if (!business) redirect('/not-found');

	return (
		<div className='flex gap-5'>
			<div className='hidden lg:block w-1/4'>
				<HomeNavigation />
			</div>

			<div className='w-full lg:w-4/5 space-y-5'>
				<ProfileInfos type='business' infos={business} />

				<ProfileNavigation
					items={[
						{
							icon: 'gallery',
							text: 'Gallery',
							href: `/businesses/${businessId}/gallery`,
						},
						{
							icon: 'location',
							text: 'Grounds',
							href: `/businesses/${businessId}/grounds`,
						},
						{
							icon: 'two-user',
							text: 'Clubs',
							href: '',
						},
					]}
				/>

				{children}
			</div>
		</div>
	);
}
