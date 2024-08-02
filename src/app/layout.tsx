import type { Metadata } from 'next';
import './globals.css';
import { twMerge } from 'tailwind-merge';

import { poppinsFont } from '@/config/fonts';
import ContextProvider from '@/components/ContextProvider';
import Navbar from '@/components/navbar/Navbar';

export const metadata: Metadata = {
	title: 'Sporgates',
	description: "Lotrima l'mlih",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='scroll-smooth'>
			<head>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
				/>
			</head>
			<body
				className={twMerge(
					'bg-background text-text text-base font-sans',
					poppinsFont.variable
				)}
			>
				<ContextProvider>
					<Navbar />
					<main className='2xl:container mx-auto px-5 lg:px-16 p-5'>{children}</main>
					{/* <Footer /> */}
				</ContextProvider>
			</body>
		</html>
	);
}
