'use client';

import { Table } from '@/components/utils/table/Table';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { useContext, useState } from 'react';
import { AlertContext } from '@/client/contexts/alert.context';
import { UserClientService } from '@/client/services/user.client-service';
import { User } from '@/types/user.types';
import { BusinessClientService } from '@/client/services/business.client-service';
import Avatar from '@/components/utils/Avatar';
import { Input } from '@/components/utils/form/Input';
import { useForm } from 'react-hook-form';
import Dropdown from '@/components/utils/Dropdown';
import List from '@/components/utils/List';
import Loader from '@/components/utils/Loader';
import Link from 'next/link';
import ConfirmationPopup from '@/components/shared/ConfirmationPopup';
import List2 from '@/components/utils/List2';
import ListItem from '@/components/utils/ListItem';
import { UserContext } from '@/client/contexts/user.context';

interface Props {
	businessId: string;
}

export default function StaffTable({ businessId }: Props) {
	const showAlert = useContext(AlertContext);
	const [user] = useContext(UserContext);

	const { register, watch, reset } = useForm({
		defaultValues: {
			username: '',
		},
	});

	const username = watch('username');

	const [selectedStaff, setSelectedStaff] = useState<User | null>(null);

	const {
		data: staff,
		loading: loadingStaff,
		refetch: refetchStaff,
	} = useFetch(
		[],
		{
			async fetch() {
				if (!businessId) return [];
				try {
					const staff = await BusinessClientService.getStaff(businessId);
					return staff.filter((s) => s.id !== user?.id);
				} catch (error) {
					console.error(error);
					showAlert({
						type: 'danger',
						message: 'Error while fetching reservations',
					});
					return [];
				}
			},
		},
		[businessId]
	);

	const { data: users, loading: loadingUsers } = useFetch(
		[],
		{
			async fetch() {
				try {
					if (!username) return [];
					const users = await UserClientService.getPage({ keywords: username });
					return users;
				} catch (error) {
					console.error(error);
					showAlert({
						type: 'danger',
					});
					return [];
				}
			},
		},
		[username]
	);

	const handleAdd = async (userId: string) => {
		try {
			reset();
			await BusinessClientService.addStaff(businessId, userId);

			showAlert({
				type: 'success',
				message: 'Staff added',
			});

			refetchStaff();
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	const handleRemove = async () => {
		try {
			await BusinessClientService.removeStaff(businessId, selectedStaff!.id);

			showAlert({
				type: 'success',
				message: 'Staff removed',
			});

			refetchStaff();
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	return (
		<>
			<div className='mb-3'>
				<Input
					{...register('username')}
					placeholder='Add staff by username'
					suffix={loadingUsers && <Loader />}
				/>

				{users.length > 0 && username && (
					<div className='flex justify-end'>
						<Dropdown open={true} containerClassName='absolute'>
							<List2>
								{users.map((user) => {
									const isSelected = staff.some((s) => s.id === user.id);
									return (
										<ListItem
											key={user.id}
											containerClassName={isSelected ? 'opacity-75' : ''}
											prefix={<Avatar src={'/images/avatar.png'} size={35} />}
											onClick={() => !isSelected && handleAdd(user.id)}
										>
											<div>
												<div className='text-sm text-text-secondary-dark'>
													{user.name}
												</div>
												<div className='text-xs text-text-secondary'>
													@{user.username}
												</div>
											</div>
										</ListItem>
									);
								})}
							</List2>
						</Dropdown>
					</div>
				)}
			</div>

			<Table
				headers={[
					{
						field: (row) => <Avatar src={row.avatar || ''} size={30} />,
						display: 'Avatar',
					},
					{
						field: (row) => (
							<Link href={`/users/${row.id}`} className='underline'>
								{row.name}
							</Link>
						),
						display: 'Name',
					},
				]}
				data={staff}
				actions={[
					{
						name: 'Remove',
						callback: setSelectedStaff,
					},
				]}
				loading={loadingStaff}
			/>

			{selectedStaff && (
				<ConfirmationPopup
					open={true}
					setOpen={(open) => setSelectedStaff(open ? selectedStaff : null)}
					title='Remove staff'
					description='Are you sure you want to remove this staff?'
					onConfirm={handleRemove}
				/>
			)}
		</>
	);
}
