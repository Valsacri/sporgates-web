'use client';

import Button from '@/components/utils/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AlertContext } from '@/client/contexts/alert.context';
import { UpdateBusinessProfileDtoType } from '@/dtos/business.dto';
import { BusinessClientService } from '@/client/services/business.client-service';
import { USERNAME_CHANGE_INTERVAL } from '@/constants';
import { z } from 'zod';
import { UpdateUsernameDto, UpdateUsernameDtoType } from '@/dtos/user.dto';
import { Input } from '@/components/utils/form/Input';
import { Business } from '@/types/business.types';

interface Props {
	business: Business;
}

function UpdateBusinessProfileForm({ business }: Props) {
	const showAlert = useContext(AlertContext);

	const profileForm = useForm({
		defaultValues: {
			name: business.name,
			bio: business.bio,
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
		},
		resolver: zodResolver(UpdateUsernameDto),
	});

	const onSubmitProfile = async (data: UpdateBusinessProfileDtoType) => {
		try {
			await BusinessClientService.updateProfile(business!.id as string, data);

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

	const onSubmitUsername = async (data: UpdateUsernameDtoType) => {
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

			await BusinessClientService.updateUsername(business!.id, data);

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
		<>
			<div className='space-y-2'>
				<h4>Change profile</h4>
				<form
					onSubmit={profileForm.handleSubmit(onSubmitProfile)}
					className='grid grid-cols-1 lg:grid-cols-2 gap-3'
				>
					<Input
						{...profileForm.register('name')}
						label='Name'
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
			</div>
			<div className='space-y-2'>
				<h4>Change username</h4>
				<form
					onSubmit={usernameForm.handleSubmit(onSubmitUsername)}
					className='space-y-3'
				>
					<Input
						{...usernameForm.register('username')}
						label='Username'
						placeholder='Enter your username'
						className=''
					/>
					<p className='text-xs font-light '>
						Can only be changed once every 15 days
					</p>
					<Button
						type='submit'
						color='primary'
						className='min-w-full lg:min-w-48 ml-auto'
						loading={usernameForm.formState.isSubmitting}
					>
						Save
					</Button>
				</form>
			</div>
		</>
	);
}

export default UpdateBusinessProfileForm;
