'use client';

import Button from '@/components/utils/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AlertContext } from '@/client/contexts/alert.context';
import { UpdateBusinessDtoType } from '@/dtos/business.dto';
import { BusinessClientService } from '@/client/services/business.client-service';
import { USERNAME_CHANGE_INTERVAL } from '@/constants';
import { z } from 'zod';
import { UsernameDto, UsernameDtoType } from '@/dtos/user.dto';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';
import { useFetch } from '@/client/hooks/utils/useFetch';
import Loader from '@/components/utils/Loader';

interface Props {
	params: { businessId: string };
}

function Page({ params: { businessId } }: Props) {
	const showAlert = useContext(AlertContext);

	const profileForm = useForm({
		defaultValues: {
			name: '',
			bio: '',
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
			username: '',
		},
		resolver: zodResolver(UsernameDto),
	});

	const {
		data: business,
		refetch,
		loading,
	} = useFetch(null, {
		async fetch() {
			try {
				const business = await BusinessClientService.getOne(businessId);
				profileForm.reset({
					name: business.name,
					bio: business.bio,
				});
				usernameForm.reset({
					username: business.username,
				});
				return business;
			} catch (error) {
				console.error(error);
				showAlert({
					type: 'danger',
				});
			}
		},
	});

	const onSubmitProfile = async (data: UpdateBusinessDtoType) => {
		try {
			await BusinessClientService.updateProfile(business!.id as string, data);

			refetch();

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

			await BusinessClientService.updateUsername(business!.id, data);

			refetch();

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
		<Card title='Business settings' bodyClassName='space-y-3'>
			{loading ? (
				<Loader className='size-10 mx-auto' />
			) : (
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
			)}
		</Card>
	);
}

export default Page;
