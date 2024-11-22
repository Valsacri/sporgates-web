'use client';

import Sidebar from '@/components/layout/sidebar/Sidebar';
import Navbar from '@/components/layout/navbar/Navbar';
import { twMerge } from 'tailwind-merge';
import { useContext } from 'react';
import { BreakpointContext } from '@/client/contexts/breakpoint.context';
import Splash from '@/components/layout/Splash';
import Bottombar from '@/components/layout/bottombar/Bottombar';
import { UserContext } from '@/client/contexts/user.context';

// export const metadata: Metadata = {
// 	title: 'Sporgates',
// 	description: "Lotrima l'mlih",
// };

// const app = initFirebaseApp();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [user] = useContext(UserContext);
	const breakpoint = useContext(BreakpointContext);

	return (
		<>
			{breakpoint.isMobile && <Navbar />}
			<div
				className={twMerge(
					'flex w-screen h-screen',
					breakpoint.isMobile && 'my-16'
				)}
			>
				{!breakpoint.isMobile && !!user && <Sidebar />}
				<div className='w-full h-full 2xl:container mx-auto p-3 overflow-y-auto'>
					{children}
				</div>
			</div>
			{breakpoint.isMobile && <Bottombar />}
		</>
	);
}
