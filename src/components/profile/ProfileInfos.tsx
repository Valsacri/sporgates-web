import { twMerge } from 'tailwind-merge';
import Card from '../utils/Card';
import Button from '../utils/Button';
import ManageStaffPopup from '../business/manage/ManageStaffPopup';
import { User } from '@/types/user.types';
import { Business } from '@/types/business.types';

interface Props {
	type: 'user' | 'business';
	infos: User | Business;
}

function ProfileInfos({ type, infos }: Props) {
	return (
		<Card
			className={twMerge(
				'group/cover p-0 flex flex-col justify-between h-[300px] bg-cover bg-center'
			)}
			style={{
				backgroundImage: `url('${infos.cover || '/images/placeholder.png'}')`,
			}}
		>
			<div className='opacity-0 group-hover/cover:opacity-100 transition-all duration-50 space-y-2 p-5'>
				<Button icon='insta' color='white' className='bg-opacity-80 ' />
				<Button icon='crop' color='white' className='bg-opacity-80 ' />
			</div>

			<div className='bg-black bg-opacity-40 flex flex-col lg:flex-row justify-between items-end p-5 rounded-b-xl'>
				<div className='flex items-center gap-5 text-white'>
					<div
						className={twMerge(
							'group/avatar size-[120px] rounded-full bg-cover bg-center'
						)}
						style={{
							backgroundImage: `url(${
								infos.avatar || '/images/avatar-placeholder.png'
							})`,
						}}
					>
						<div className='hidden group-hover/avatar:flex size-full rounded-full justify-around items-center bg-opacity-0 hover:bg-black hover:bg-opacity-20 transition-all duration-50'>
							<Button icon='insta' color='white' className='bg-opacity-80' />
							<Button icon='eye' color='white' className='bg-opacity-80' />
						</div>
					</div>

					<div>
						<h1>{infos.name}</h1>
						<span className='text-sm'>{`@${infos.username}`}</span>
					</div>
				</div>

				<div className='flex gap-3'>
					<Button icon='edit' color='white' className='rounded-full'>
						Edit profile
					</Button>
					{type === 'business' && (
						<ManageStaffPopup businessId={infos.id}>
							<Button icon='two-user' color='white' className='rounded-full'>
								Staff
							</Button>
						</ManageStaffPopup>
					)}
				</div>
			</div>
		</Card>
	);
}

export default ProfileInfos;
