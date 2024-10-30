export default function ServerError() {
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center bg-gray-100 text-gray-800'>
			<h1 className='text-6xl font-bold text-primary mb-6'>500</h1>
			<h2 className='text-3xl font-semibold mb-4'>
				Oops! Something went wrong.
			</h2>
			<p className='text-lg text-gray-600 mb-8 text-center max-w-md'>
				We’re experiencing some server issues. Please try refreshing the page or
				come back later.
			</p>
			<button className='bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-200'>
				Refresh Page
			</button>
		</div>
	);
}
