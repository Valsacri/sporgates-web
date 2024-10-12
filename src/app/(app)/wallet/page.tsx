'use client';

import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { Input } from '@/components/utils/form/Input';
import { Table } from '@/components/utils/table/Table';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaWallet } from 'react-icons/fa6';

function Page() {
	const [showAddToBalance, setShowAddToBalance] = useState(false);

	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			amount: '',
		},
	});

	const handleDeposit = ({ amount }: { amount: number }) => {
		try {
			const reservations = await walletser.getAll(
				ground,
				selectedStatus === 'all' ? null : selectedStatus
			);
			return reservations;
		} catch (error) {
			console.log(error);
			showAlert({
				color: 'danger',
				message: 'Error while fetching reservations',
			});
			return [];
		}
	};

	return (
		<div className='space-y-5'>
			<Card title='Wallet'>
				<div className='flex justify-between items-center mt-5'>
					<div className='flex gap-3'>
						<FaWallet className='size-20 cursor-pointer text-primary-dark' />
						<div>
							<div className='text-2xl'>Balance</div>
							<div className='font-semibold text-3xl text-success-dark'>
								400,00MAD
							</div>
						</div>
					</div>

					<Button
						color='primary'
						icon='add'
						onClick={() => setShowAddToBalance(!showAddToBalance)}
					>
						Add to balance
					</Button>
				</div>

				{showAddToBalance && (
					<>
						<hr className='my-5' />
						<div className='flex justify-between items-center'>
							<h2 className='mb-3'>Add funds</h2>
							<form
								className='flex justify-between gap-3'
								onSubmit={handleSubmit(onSubmit)}
							>
								<Input
									{...register('amount')}
									placeholder='00,00'
									suffix={'DH'}
									className='w-28'
									inputClassName='text-xl'
									suffixClassName='text-xl'
								/>
								<Button color='primary' icon='check' type='submit'>
									Continue
								</Button>
							</form>
						</div>
					</>
				)}
			</Card>

			<Card title='Transactions'>
				<Table
					headers={[
						{ field: '', display: 'Date' },
						{ field: '', display: 'Description' },
						{ field: '', display: 'Amount' },
					]}
					data={[]}
				/>
			</Card>
		</div>
	);
}

export default Page;
