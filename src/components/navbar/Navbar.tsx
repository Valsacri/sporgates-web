import Link from 'next/link';
import Logo from '../Logo';
import HomeNavigation from '../home/HomeNavigation';
import Button from '../utils/Button';
import Dropdown from '../utils/Dropdown';
import Icon from '../utils/Icon';
import { Input } from '../utils/form/Input';
import NavbarNavigation from './NavbarNavigation';
import { DatePicker } from '../utils/form/DatePicker';

function Navbar() {
	return (
		<div className='bg-white fixed top-0 w-full z-40'>
			<div className='2xl:container mx-auto px-2 lg:px-16 flex justify-between items-center'>
				<div>
					<Dropdown
						closeOnClick
						trigger={
							<Button icon='burger' className='lg:hidden scale-x-[-1]'></Button>
						}
						position='left'
					>
						<HomeNavigation />
					</Dropdown>
					<Link className='hidden lg:block' href='/'>
						<Logo />
					</Link>
				</div>

				<div className='flex gap-5'>
					<div className='flex gap-3 py-3'>
						<Link href='\'>
							<Button
								icon='home'
								color='primary'
								className='w-[40px] lg:w-max justify-center '
							>
								<span className='hidden lg:block'>Home</span>
							</Button>
						</Link>
						<Button icon='menu' color='secondary'></Button>
					</div>

					<Input
						name='dfa'
						placeholder='Search for people, pages, groups and #hashtags'
						suffix={<Icon name='search' />}
						className='hidden lg:block py-3 w-96'
					/>

					<div className='flex gap-0 lg:gap-3'>
						<Button icon='two-user' className='h-full rounded-none'></Button>
						<Button icon='message' className='h-full rounded-none'></Button>
						<Button
							icon='notification'
							className='h-full rounded-none'
						></Button>
					</div>

					<div>
						<NavbarNavigation />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
