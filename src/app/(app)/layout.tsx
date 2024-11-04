import type { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import HomeNavigation from '@/components/home/HomeNavigation';

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
			<Navbar />
			<div className='2xl:container mx-auto flex gap-3 mt-16 px-2 py-3 lg:px-16'>
				<div className='hidden lg:block w-1/5'>
					<HomeNavigation />
				</div>
				<div className='w-full lg:w-4/5'>{children}</div>
			</div>
		</>
	);
}
