import HomeNavigation from '@/components/home/HomeNavigation';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';
import { HttpHelper } from '@/server/helpers/http.helper';
import { UserServerService } from '@/server/services/user.server-service';
import { User } from '@/types/user.types';
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
		<div className='flex gap-5'>
			<div className='hidden lg:block w-1/4'>
				<HomeNavigation />
			</div>

			<div className='w-full lg:w-4/5 space-y-5'>
				<ProfileInfos
					type='user'
					infos={{ ...user, name: `${user.firstName} ${user.lastName}` }}
				/>

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
		</div>
	);
}
