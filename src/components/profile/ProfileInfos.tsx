'use client';

import Button from '../utils/Button';
import { User } from '@/types/user.types';
import { Business } from '@/types/business.types';
import { ProfileType } from '@/types/general.types';
import Avatar from '../utils/Avatar';
import Card from '../utils/Card';
import ImageUploadPopup from './ImageUploadPopup';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { StorageHelper } from '@/client/helpers/storage.helper';

interface Props {
	type: ProfileType;
	infos: User | Business;
}

function ProfileInfos({ type, infos }: Props) {
	const [open, toggleOpen] = usePopup();

	const handleUpload = async (file: File) => {
		await StorageHelper.uploadFile('/images/cover-photos', file);
	};

	return (
		<Card className='p-0'>
			<div className='relative aspect-[3] w-full'>
				<div
					className='size-full bg-cover bg-center hover:brightness-95 transition-all duration-150 cursor-pointer rounded-t-md'
					style={{
						backgroundImage: `url('${
							infos.cover || '/images/placeholder.png'
						}')`,
					}}
				></div>

				<div className='absolute bottom-0 right-0 flex gap-3 ml-auto mt-auto p-3'>
					<Button icon='insta' color='white' onClick={toggleOpen}>
						<span className='hidden md:inline'>Edit cover photo</span>
					</Button>
				</div>
			</div>

			<div className='flex flex-col md:flex-row justify-center md:justify-between px-3 pb-3'>
				<div className='flex flex-col md:flex-row md:text-start items-center gap-5 -mt-20 md:-mt-8'>
					<div className='relative'>
						<Avatar
							size={150}
							className='hover:brightness-95 transition-all duration-150 cursor-pointer'
							src={infos.avatar}
						/>
						<Button
							icon='insta'
							color='white'
							className='rounded-full absolute bottom-0 right-0'
						/>
					</div>
					<div className='text-center md:text-start md:pt-3'>
						<h1 className='text-text-secondary-dark text-3xl'>{infos.name}</h1>
						<span className='text-text-secondary'>{`@${infos.username}`}</span>
					</div>
				</div>

				{/* <div className='flex md:flex-col items-end gap-2 mt-5'>
					<Link
						href={
							type === ProfileType.USER
								? '/settings/profile'
								: `/businesses/${infos.id}`
						}
					>
						<Button icon='edit' color='white' rounded className='w-full border'>
							{type === ProfileType.USER ? 'Edit profile' : 'Manage'}
						</Button>
					</Link>
				</div> */}
			</div>

			<ImageUploadPopup
				title='Edit cover photo'
				open={open}
				onClose={toggleOpen}
				onUpload={handleUpload}
			/>
		</Card>
	);
}

export default ProfileInfos;
