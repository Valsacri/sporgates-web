import type { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';

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
			<div className='2xl:container mx-auto mt-16 px-2 py-3 lg:px-16'>
				{children}
			</div>
		</>
	);
}
