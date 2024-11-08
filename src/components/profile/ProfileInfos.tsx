import Button from '../utils/Button';
import ManageStaffPopup from '../business/manage/ManageStaffPopup';
import { User } from '@/types/user.types';
import { Business } from '@/types/business.types';
import { ProfileType } from '@/types/general.types';
import UpdateProfileFormPopup from './manage/name/UpdateProfileFormPopup';
import Avatar from '../utils/Avatar';
import Icon from '../utils/Icon';

interface Props {
	type: ProfileType;
	infos: User | Business;
}

function ProfileInfos({ type, infos }: Props) {
	return (
		<div>
			<div className='relative aspect-[2.7] w-full'>
				<div
					className='size-full bg-cover bg-center hover:brightness-95 transition-all duration-150 cursor-pointer rounded-md'
					style={{
						// backgroundImage: `url('${infos.cover || '/images/placeholder.png'}')`,
						backgroundImage: `url('/images/placeholder.png')`,
					}}
				></div>

				<div className='absolute bottom-0 right-0 flex gap-3 ml-auto mt-auto p-3'>
					<Button icon='insta' color='white'>
						<span className='hidden md:inline'>Edit cover photo</span>
					</Button>
				</div>
			</div>

			<div className='flex justify-between items-end px-3'>
				<div className='flex flex-col md:flex-row md:text-start items-center gap-5 -mt-20 md:-mt-8'>
					<div className='relative'>
						<Avatar
							size={150}
							className='hover:brightness-95 transition-all duration-150 cursor-pointer'
						/>
						<Button
							icon='insta'
							color='white'
							className='rounded-full absolute bottom-0 right-0'
						/>
					</div>
					<div>
						<h1 className='text-text-secondary-dark text-3xl'>{infos.name}</h1>
						<span className='text-text-secondary'>{`@${infos.username}`}</span>
					</div>
				</div>

				<div className='flex gap-2'>
					<UpdateProfileFormPopup type={type} profile={infos}>
						<Button icon='edit' color='white' rounded className='border'>
							Edit profile
						</Button>
					</UpdateProfileFormPopup>
					{type === ProfileType.BUSINESS && (
						<ManageStaffPopup businessId={infos.id}>
							<Button icon='two-user' color='white' rounded className='border'>
								Staff
							</Button>
						</ManageStaffPopup>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProfileInfos;
