import { twMerge } from 'tailwind-merge';
import { poppinsFont } from '@/client/config/fonts';
import GlobalContextProvider from '@/components/context-providers/GlobalContextProvider';

import '../client/styles/globals.css';
import '../client/styles/calendar.css';
import 'react-calendar/dist/Calendar.css';
import { Metadata } from 'next';

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
				<GlobalContextProvider>{children}</GlobalContextProvider>
			</body>
		</html>
	);
}
