'use client';

import Button from '@/components/utils/Button';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertContext } from '@/client/contexts/alert.context';
import { UpdateBusinessDtoType } from '@/dtos/business.dto';
import { BusinessClientService } from '@/client/services/business.client-service';
import { Input } from '../utils/form/Input';
import { Business } from '@/types/business.types';
import { GENERIC_ERROR_MESSAGE, USERNAME_CHANGE_INTERVAL } from '@/constants';
import StaffTable from './StaffTable';
import { z } from 'zod';
import { UsernameDto, UsernameDtoType } from '@/dtos/user.dto';

interface Props {
	business: Business;
}

function UpdateBusinessForm({ business }: Props) {
	const router = useRouter();
	const showAlert = useContext(AlertContext);

	const profileForm = useForm({
		defaultValues: {
			name: business.name,
			bio: business.bio,
		} as {
			name: string;
			bio?: string;
		},
		resolver: zodResolver(
			z.object({
				name: z.string().min(1),
				bio: z.string().optional(),
			})
		),
	});

	const usernameForm = useForm({
		defaultValues: {
			username: business.username,
		} as UsernameDtoType,
		resolver: zodResolver(UsernameDto),
	});

	const onSubmitProfile = async (data: UpdateBusinessDtoType) => {
		try {
			await BusinessClientService.updateProfile(business.id as string, data);

			router.refresh();

			showAlert({
				type: 'success',
				message: 'Profile updated',
			});
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	const onSubmitUsername = async (data: UsernameDtoType) => {
		try {
			const canChangeUsername =
				business?.lastUsernameChangeAt &&
				business.lastUsernameChangeAt > Date.now() - USERNAME_CHANGE_INTERVAL;

			if (canChangeUsername) {
				showAlert({
					type: 'warning',
					message: `Can only change username once every ${
						USERNAME_CHANGE_INTERVAL / (24 * 60 * 60 * 1000)
					} days`,
				});
				return;
			}

			await BusinessClientService.updateUsername(business.id, data);

			router.refresh();

			showAlert({
				type: 'success',
				message: 'Username updated',
			});
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	return (
		<div className='space-y-3'>
			<form
				onSubmit={profileForm.handleSubmit(onSubmitProfile)}
				className='grid grid-cols-1 lg:grid-cols-2 gap-3'
			>
				<Input
					{...profileForm.register('name')}
					label='First name'
					placeholder='Enter your first name'
				/>
				<Input
					{...profileForm.register('bio')}
					label='Bio'
					placeholder='Enter your bio'
				/>
				<div className='col-span-2'>
					<Button
						type='submit'
						color='primary'
						className='min-w-full lg:min-w-48 ml-auto'
						loading={profileForm.formState.isSubmitting}
					>
						Save
					</Button>
				</div>
			</form>

			<form
				onSubmit={usernameForm.handleSubmit(onSubmitUsername)}
				className='flex flex-col lg:flex-row lg:items-end gap-3'
			>
				<Input
					{...usernameForm.register('username')}
					label='Username'
					placeholder='Enter your username'
					className=''
				/>
				<p className='lg:hidden text-xs font-light '>
					Can only be changed once every 15 days
				</p>
				<Button
					type='submit'
					color='primary'
					className='min-w-full lg:min-w-48'
					loading={usernameForm.formState.isSubmitting}
				>
					Save
				</Button>
			</form>

			{business && (
				<div className='space-y-3'>
					<h4>Manage staff</h4>
					<StaffTable businessId={business.id} />
				</div>
			)}
		</div>
	);
}

export default UpdateBusinessForm;
