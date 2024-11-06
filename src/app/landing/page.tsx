import CallToAction from '@/components/landing-page/CallToAction';
import Navbar from '@/components/layout/navbar/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='bg-gray-100 text-gray-800 font-sans'>
			<Navbar />

			{/* Hero Section */}
			<section className="mt-16 bg-cover bg-center h-[calc(100vh-64px)] bg-[url('/images/hero.jpg')]">
				<div className='w-full h-full p-5 flex items-center justify-center gap-20 bg-black bg-opacity-50'>
					<div className='flex flex-col md:flex-row items-center md:items-end gap-20'>
						<div className='rounded-md'>
							<h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>
								Connect with Athletes, <br /> Anytime, Anywhere
							</h1>
							<p className='text-lg md:text-xl text-gray-300'>
								Find players, join matches, book sports grounds, <br /> and
								socialize with athletes.
							</p>
						</div>

						<CallToAction />
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 px-6 md:px-20 bg-white'>
				<h2 className='text-3xl font-bold text-center mb-12 text-gray-800'>
					Lorem ipsum dolor sit amet consectetur !
				</h2>
				<div className='grid md:grid-cols-3 gap-12'>
					{/* Find Players */}
					<div className='text-center'>
						<Image
							src='/images/logo-big.png'
							width={100}
							height={100}
							alt='Find players icon'
							className='mx-auto mb-4'
						/>
						<h3 className='text-xl font-semibold mb-2'>Find Players</h3>
						<p className='text-gray-600'>
							Connect with local players looking for a game. From casual play to
							competitive matches, find your ideal sports partner.
						</p>
					</div>
					{/* Book Grounds */}
					<div className='text-center'>
						<Image
							src='/images/logo-big.png'
							width={100}
							height={100}
							alt='Find grounds icon'
							className='mx-auto mb-4'
						/>
						<h3 className='text-xl font-semibold mb-2'>Book Grounds & Clubs</h3>
						<p className='text-gray-600'>
							Reserve the perfect ground or join exclusive sports clubs in your
							area. Make the most of our easy booking system.
						</p>
					</div>
					{/* Socialize with Athletes */}
					<div className='text-center'>
						<Image
							src='/images/logo-big.png'
							width={100}
							height={100}
							alt='Socialize icon'
							className='mx-auto mb-4'
						/>
						<h3 className='text-xl font-semibold mb-2'>
							Socialize with Athletes
						</h3>
						<p className='text-gray-600'>
							Share achievements, post game highlights, and chat with athletes
							worldwide. Elevate your sports experience.
						</p>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className='bg-primary text-white py-16 text-center'>
				<h2 className='text-3xl font-bold mb-6'>Ready to Play?</h2>
				<p className='text-lg mb-8'>
					Join our community and start connecting with sports enthusiasts in
					your area.
				</p>
				<Link
					href='/signup'
					className='bg-white text-primary font-semibold py-3 px-8 rounded-md hover:bg-gray-200 transition'
				>
					Get Started
				</Link>
			</section>

			{/* Footer */}
			<footer className='bg-gray-800 text-gray-200 py-8 text-center'>
				<p className='text-sm'>© 2024 Your App Name. All Rights Reserved.</p>
				<Link
					href='/privacy-policy'
					className='text-gray-400 hover:text-gray-100'
				>
					Privacy Policy
				</Link>
			</footer>
		</div>
	);
}
