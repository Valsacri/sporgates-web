'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { UserContext } from '@/client/contexts/user.context';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { SportClientService } from '@/client/services/sport.client-service';
import { UserClientService } from '@/client/services/user.client-service';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';
import { Select, SelectOption } from '@/components/utils/form/Select';
import { USERNAME_CHANGE_INTERVAL } from '@/constants';
import {
	UpdateUsernameDto,
	UpdateUsernameDtoType,
	UpdateUserProfileDto,
	UpdateUserProfileDtoType,
} from '@/dtos/user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

function Page() {
	const [user] = useContext(UserContext);
	const showAlert = useContext(AlertContext);

	const profileForm = useForm({
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			bio: user?.bio,
			sports: user?.sports,
		} as UpdateUserProfileDtoType,
		resolver: zodResolver(UpdateUserProfileDto),
	});

	const selectedSports = profileForm.watch('sports');

	const usernameForm = useForm({
		defaultValues: {
			username: user?.username,
		} as UpdateUsernameDtoType,
		resolver: zodResolver(UpdateUsernameDto),
	});

	const onSubmitProfile = async (data: UpdateUserProfileDtoType) => {
		try {
			await UserClientService.updateProfile(data);
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
				user?.lastUsernameChangeAt &&
				user.lastUsernameChangeAt > Date.now() - USERNAME_CHANGE_INTERVAL;

			if (canChangeUsername) {
				showAlert({
					type: 'warning',
					message: `Can only change username once every ${
						USERNAME_CHANGE_INTERVAL / (24 * 60 * 60 * 1000)
					} days`,
				});
				return;
			}

			await UserClientService.updateUsername(data);
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

	const { data: sportsOptions, loading: loadingSportsOptions } = useFetch([], {
		async fetch() {
			const sports = await SportClientService.getAll();
			return sports.map(
				(sport) => ({ value: sport.id, label: sport.name } as SelectOption)
			);
		},
	});

	return (
		<Card title='Profile settings' bodyClassName='space-y-3'>
			<form
				onSubmit={profileForm.handleSubmit(onSubmitProfile)}
				className='grid grid-cols-2 gap-3'
			>
				<Input
					{...profileForm.register('firstName')}
					label='First name'
					placeholder='Enter your first name'
					className='col-span-2 lg:col-span-1'
				/>
				<Input
					{...profileForm.register('lastName')}
					label='Last name'
					placeholder='Enter your last name'
					className='col-span-2 lg:col-span-1'
				/>
				<Input
					{...profileForm.register('bio')}
					label='Bio'
					placeholder='Enter your bio'
					className='col-span-2 lg:col-span-1'
				/>
				<Select
					{...profileForm.register('sports')}
					value={selectedSports}
					onChange={(sports) =>
						profileForm.setValue('sports', sports as string[])
					}
					options={sportsOptions}
					label='Sports'
					placeholder='Select sports'
					error={profileForm.formState.errors.sports?.message}
					loading={loadingSportsOptions}
					className='col-span-2 lg:col-span-1'
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

			<p className='hidden lg:block text-xs font-light '>
				Can only be changed once every 15 days
			</p>
		</Card>
	);
}

export default Page;
