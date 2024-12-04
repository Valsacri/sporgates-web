'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { UserContext } from '@/client/contexts/user.context';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { AddressClientService } from '@/client/services/geo/address.client-service';
import AddressForm from '@/components/address/AddressForm';
import ConfirmationPopup from '@/components/shared/ConfirmationPopup';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import Icon from '@/components/utils/Icon';
import { Popup } from '@/components/utils/Popup';
import { Table } from '@/components/utils/table/Table';
import {
	CreateAddressDtoType,
	UpdateAddressDtoType,
} from '@/dtos/item/general.dto';
import { Address, City, Town } from '@/types/geo.types';
import { useContext, useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';

interface Props {
	onSelect?: (address: Address) => any;
	hideActions?: boolean;
}

function AddressManager({ onSelect, hideActions }: Props) {
	const [user] = useContext(UserContext);
	const showAlert = useContext(AlertContext);

	const [address, setAddress] = useState<Address | null | undefined>(undefined);

	const {
		data: addresses,
		refetch,
		loading,
	} = useFetch<Address[]>([], {
		async fetch() {
			try {
				const addresses = await AddressClientService.getByUser(user!.id);
				return addresses;
			} catch (error) {
				console.log(error);
				showAlert({
					type: 'danger',
				});
				return [];
			}
		},
	});

	const handleCreate = async (address: CreateAddressDtoType) => {
		try {
			await AddressClientService.create({ ...address, user: user!.id });
			showAlert({
				type: 'success',
				message: 'Address added successfully',
			});
			refetch();
			setAddress(undefined);
		} catch (error) {
			console.log(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	const handleUpdate = async (_address: UpdateAddressDtoType) => {
		try {
			await AddressClientService.update(address!.id, _address);
			showAlert({
				type: 'success',
				message: 'Address updated successfully',
			});
			refetch();
			setAddress(undefined);
		} catch (error) {
			console.log(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	const handleDelete = async () => {
		try {
			await AddressClientService.delete(address!.id);
			showAlert({
				type: 'success',
				message: 'Address deleted successfully',
			});
			refetch();
			setAddress(undefined);
		} catch (error) {
			console.log(error);
			showAlert({
				type: 'danger',
			});
		}
	};

	const handleClickAdd = async () => {
		setAddress(null);
	};

	const handleSubmit = async (_address: CreateAddressDtoType) => {
		if (address) {
			await handleUpdate(_address);
		} else {
			await handleCreate(_address);
		}
	};

	return (
		<Card
			title={onSelect ? 'Address picker' : 'Manage addresses'}
			titleSuffix={
				<Button
					icon={<HiOutlinePlusCircle className='size-5' />}
					onClick={handleClickAdd}
				/>
			}
		>
			<div className='space-y-3'>
				<Table
					headers={[
						{ display: 'Label', field: 'label' },
						{ display: 'City', field: (row) => (row.city as City).name },
						{ display: 'Town', field: (row) => (row.town as Town).name },
					]}
					data={addresses}
					actions={
						hideActions
							? []
							: [
									{
										name: () => (
											<div className='flex items-center gap-2'>
												<Icon name='edit' /> Edit
											</div>
										),
										callback: setAddress,
									},
									{
										name: (row) => (
											<ConfirmationPopup onConfirm={handleDelete}>
												<div
													className='flex items-center gap-2'
													onClick={() => setAddress(row)}
												>
													<Icon name='trash' /> Delete
												</div>
											</ConfirmationPopup>
										),
									},
							  ]
					}
					loading={loading}
					onRowClick={onSelect}
				/>
			</div>

			<Popup
				open={address || address === null}
				title={address ? 'Edit address' : 'Add address'}
				onClose={() => setAddress(undefined)}
			>
				<AddressForm
					onSubmit={handleSubmit}
					init={
						address && {
							...address,
							city: (address.city as City).id,
							town: (address.town as Town).id,
						}
					}
				/>
			</Popup>
		</Card>
	);
}

export default AddressManager;
