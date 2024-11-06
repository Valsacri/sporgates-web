import type { Metadata } from 'next';
import Sidebar from '@/components/layout/sidebar/Sidebar';

export const metadata: Metadata = {
	title: 'Sporgates',
	description: "Lotrima l'mlih",
};

// const app = initFirebaseApp();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{/* <Navbar /> */}
			{/* <div className='2xl:container mx-auto mt-16 px-2 py-3 lg:px-16'> */}
			<div className='flex w-screen h-screen'>
				<Sidebar />
				<div className='w-full h-full 2xl:container mx-auto p-3 overflow-y-auto'>
					{children}
				</div>
			</div>
			{/* <div className='2xl:container mx-auto flex gap-3 mt-16 px-2 py-3 lg:px-16'>
				<div className='hidden lg:block w-1/5'>
					<HomeNavigation />
				</div>
				<div className='w-full lg:w-4/5'>{children}</div>
			</div> */}
		</>
	);
}
