import HomeNavigation from '@/components/home/HomeNavigation';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';
import { UserServerService } from '@/server/services/user.server-service';
import { User } from '@/types/user.types';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
	userId: string;
}

export default async function ProfileLayout({ children, userId }: Props) {
	let user: User = {} as User;
	try {
		const _user = await UserServerService.getOne(userId);
		if (!_user) {
			return redirect('/not-found');
		}
		user = _user;
	} catch (error: any) {
		console.error(error);
		return redirect('/server-error');
	}

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

				<ProfileNavigation />

				{children}
			</div>
		</div>
	);
}
