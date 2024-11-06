import ProfileNavigation from '@/components/profile/ProfileNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';
import { HttpHelper } from '@/server/helpers/http.helper';
import { UserServerService } from '@/server/services/user.server-service';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
	children: React.ReactNode;
	params: { userId: string };
}

export default async function Layout({ children, params: { userId } }: Props) {
	const pathname = HttpHelper.getPathname();

	const user = await UserServerService.getOne(userId);
	if (!user) redirect('/not-found');

	return (
		<div className='w-full lg:w-[900px] space-y-3 mx-auto'>
			<ProfileInfos type='user' infos={user} />

			<ProfileNavigation
				items={[
					{
						icon: 'gallery',
						text: 'Gallery',
						href: `/users/${userId}/gallery`,
						selected: pathname?.endsWith('/gallery'),
					},
				]}
			/>

			{children}
		</div>
	);
}
