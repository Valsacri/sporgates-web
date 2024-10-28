export default function Unauthorized() {
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center bg-gray-100 text-gray-800'>
			<h1 className='text-6xl font-bold text-primary mb-6'>401</h1>
			<h2 className='text-3xl font-semibold mb-4'>
				Oops! You don't have the permission to get there.
			</h2>
			<p className='text-lg text-gray-600 mb-8 text-center max-w-md'>
				This page cannot be accessed for now!
			</p>
			<button className='bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-200'>
				Go back
			</button>
		</div>
	);
}
