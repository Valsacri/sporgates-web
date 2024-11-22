'use client';

import { UserContext } from '@/client/contexts/user.context';
import Splash from '@/components/layout/Splash';
import Logo from '@/components/Logo';
import Card from '@/components/utils/Card';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	const [user] = useContext(UserContext);
	const router = useRouter();

	if (user === undefined) {
		return <Splash />;
	}

	if (user) {
		return router.push('/');
	}

	return (
		<div className='lg:w-screen lg:h-screen flex justify-center items-center p-5 lg:p-32'>
			<div className='w-full flex flex-col lg:flex-row gap-3 lg:gap-40'>
				<div className='w-full lg:w-1/2 space-y-10'>
					<Logo size={100} />

					<h1 className='text-5xl'>
						<span className='text-primary'>Connect</span> With Friends
					</h1>

					<h2 className='text-2xl'>
						Share what's new and{' '}
						<span className='text-primary'>life moments</span> with your{' '}
						<span className='text-primary'>friends</span>
					</h2>
				</div>

				<div className='w-full lg:w-1/2 space-y-10'>
					<Card>{children}</Card>
				</div>
			</div>
		</div>
	);
}

export default Layout;
