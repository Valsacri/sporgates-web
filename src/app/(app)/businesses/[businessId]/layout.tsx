import { BusinessClientService } from '@/client/services/business.client-service';
import HomeNavigation from '@/components/home/HomeNavigation';
import PageNavigation from '@/components/profile/PageNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';

interface Props {
	children: React.ReactNode;
	params: { businessId: string };
}

export default async function Layout({
	children,
	params: { businessId },
}: Props) {
	const business = await BusinessClientService.getOne(businessId);

	return (
		<div className='flex gap-5'>
			<div className='hidden lg:block w-1/4'>
				<HomeNavigation />
			</div>

			<div className='w-full lg:w-4/5 space-y-5'>
				<ProfileInfos type='business' infos={business} />

				<PageNavigation />

				{children}
			</div>
		</div>
	);
}
