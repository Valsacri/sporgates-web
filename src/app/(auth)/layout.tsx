import Logo from '@/components/Logo';
import Card from '@/components/utils/Card';

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	return (
		<div className='lg:w-screen lg:h-screen flex justify-center items-center p-5 lg:p-32'>
			<div className='w-full flex flex-col lg:flex-row gap-5 lg:gap-40'>
				<div className='w-full lg:w-1/2 space-y-10'>
					<Logo width={50} height={50} />

					<h1 className='text-5xl'>
						<span className='text-primary'>Connect</span> With Friends
					</h1>

					<h2 className='text-2xl'>
						Share what's new and{' '}
						<span className='text-primary'>life moments</span> with your{' '}
						<span className='text-primary'>friends</span>
					</h2>
				</div>

				<div className='w-full lg:w-1/2 space-y-10'>
					<Card>{children}</Card>
				</div>
			</div>
		</div>
	);
}

export default Layout;
