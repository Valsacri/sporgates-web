'use client';

import Button from '@/components/utils/Button';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../../../utils/form/Input';
import { useContext, useEffect } from 'react';
import { Business } from '@/types/business.types';
import { useRouter } from 'next/navigation';
import { AlertContext } from '@/client/contexts/alert.context';
import { ProfileType } from '@/types/general.types';
import { BusinessClientService } from '@/client/services/business.client-service';
import { UserClientService } from '@/client/services/user.client-service';
import { User } from '@/types/user.types';
import {
	UpdateUserProfileDto,
	UpdateUserProfileDtoType,
} from '@/dtos/user.dto';
import {
	UpdateBusinessProfileDto,
	UpdateBusinessProfileDtoType,
} from '@/dtos/business.dto';
import { twMerge } from 'tailwind-merge';

interface Props {
	type: ProfileType;
	profile: User | Business;
}

function UpdateProfileForm({ type, profile }: Props) {
	const [open, toggleOpen] = usePopup();

	const router = useRouter();
	const showAlert = useContext(AlertContext);

	const {
		handleSubmit,
		register,
		reset,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(
			type === ProfileType.USER
				? UpdateUserProfileDto
				: UpdateBusinessProfileDto
		),
		defaultValues: {
			firstName: '',
			lastName: '',
			name: '',
			username: '',
		},
	});

	const onSubmit = async (
		data: UpdateUserProfileDtoType | UpdateBusinessProfileDtoType
	) => {
		if (type === ProfileType.USER) {
			const user = data as UpdateUserProfileDtoType;
			await UserClientService.update(profile.id as string, user);
			router.refresh();
		} else {
			const business = data as UpdateBusinessProfileDtoType;
			await BusinessClientService.update(profile.id as string, business);
			router.refresh();
		}
		reset();
		toggleOpen();
	};

	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open]);

	useEffect(() => {
		if (profile) {
			reset(profile);
		}
	}, [profile]);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
				<div className='grid grid-cols-12 gap-3'>
					{type === ProfileType.USER ? (
						<>
							<Input
								label='First name'
								{...register('firstName')}
								multiline
								error={errors.firstName?.message}
								className='col-span-12 lg:col-span-6'
							/>
							<Input
								label='Last name'
								{...register('lastName')}
								multiline
								error={errors.lastName?.message}
								className='col-span-12 lg:col-span-6'
							/>
						</>
					) : (
						<Input
							label='Name'
							{...register('name')}
							error={errors.name?.message}
							className={twMerge(type === ProfileType.BUSINESS && 'col-span-6')}
						/>
					)}
					<Input
						label='Username'
						{...register('username')}
						error={errors.username?.message}
						className={twMerge(
							type === ProfileType.USER ? 'col-span-12' : 'col-span-6'
						)}
					/>
				</div>

				<div className='flex justify-end gap-3'>
					<Button color='secondary' onClick={toggleOpen}>
						Close
					</Button>
					<Button color='primary' type='submit' loading={isSubmitting}>
						Update
					</Button>
				</div>
			</form>
		</>
	);
}

export default UpdateProfileForm;
