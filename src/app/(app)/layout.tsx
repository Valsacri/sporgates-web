'use client';

import type { Metadata } from 'next';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import useBreakpoint from '@/client/hooks/utils/useBreakpoint';
import Navbar from '@/components/layout/navbar/Navbar';
import { twMerge } from 'tailwind-merge';

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
	const { isDesktop } = useBreakpoint();

	return (
		<>
			{!isDesktop && <Navbar />}
			<div className={twMerge('flex w-screen h-screen', !isDesktop && 'mt-16')}>
				{isDesktop && <Sidebar />}
				<div className='w-full h-full 2xl:container mx-auto p-3 overflow-y-auto'>
					{children}
				</div>
			</div>
		</>
	);
}
