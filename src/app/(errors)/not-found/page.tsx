import Link from "next/link";

export default function NotFound() {
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center bg-gray-100 text-gray-800'>
			<h1 className='text-6xl font-bold text-primary mb-6'>404</h1>
			<h2 className='text-3xl font-semibold mb-4'>Page Not Found</h2>
			<p className='text-lg text-gray-600 mb-8 text-center max-w-md'>
				The page you are looking for might have been removed or is temporarily
				unavailable.
			</p>
			<Link href='/'>
				<a className='bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-200'>
					Go Back Home
				</a>
			</Link>
		</div>
	);
}
