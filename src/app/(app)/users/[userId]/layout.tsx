import { UserClientService } from '@/client/services/user.client-service';
import HomeNavigation from '@/components/home/HomeNavigation';
import PageNavigation from '@/components/profile/PageNavigation';
import ProfileInfos from '@/components/profile/ProfileInfos';

interface Props {
	children: React.ReactNode;
	params: { userId: string };
}

export default async function Layout({ children, params: { userId } }: Props) {
	const user = await UserClientService.getOne(userId);

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

				<PageNavigation />

				{children}
			</div>
		</div>
	);
}
