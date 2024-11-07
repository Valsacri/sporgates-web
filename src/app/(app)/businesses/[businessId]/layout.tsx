import ProfileNavigation from '@/components/profile/ProfileNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';
import { redirect } from 'next/navigation';
import { BusinessServerService } from '@/server/services/business.server-service';

interface Props {
	children: React.ReactNode;
	params: { businessId: string };
}

export default async function Layout({
	children,
	params: { businessId },
}: Props) {
	const business = await BusinessServerService.getOne(businessId);
	if (!business) redirect('/not-found');

	return (
		<div className='w-full lg:w-[900px] space-y-3 mx-auto'>
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
						subItems: [
							{
								icon: 'document',
								text: 'List',
								href: `/businesses/${businessId}/grounds`,
							},
							{
								icon: 'todo',
								text: 'Reservations',
								href: `/businesses/${businessId}/grounds/reservations`,
							},
						],
					},
					{
						icon: 'two-user',
						text: 'Clubs',
						href: `/businesses/${businessId}/clubs`,
						subItems: [
							{
								icon: 'document',
								text: 'List',
								href: `/businesses/${businessId}/clubs`,
							},
							{
								icon: 'todo',
								text: 'Subscriptions',
								href: `/businesses/${businessId}/clubs/subscriptions`,
							},
						],
					},
				]}
			/>

			{children}
		</div>
	);
}
