import { AlertContext } from '@/client/contexts/alert.context';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { WalletClientService } from '@/client/services/wallet.client-service';
import { useContext, useEffect } from 'react';
import Loader from '../utils/Loader';
import Image from 'next/image';
import Button from '../utils/Button';
import { Input } from '../utils/form/Input';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import { GENERIC_ERROR_MESSAGE } from '@/constants';

interface Props {
	purchasePrice?: number;
	onDeposit?: () => void;
}

function Balance({ onDeposit, purchasePrice = 0 }: Props) {
	const showAlert = useContext(AlertContext);

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		// resolver: zodResolver(WalletDepositeDto),
		defaultValues: {
			amount: '' as number | string,
		},
	});

	const amount = watch('amount');

	const handleDeposit = async () => {
		try {
			const newBalance = await WalletClientService.deposit(Number(amount));
			setBalance(newBalance);
			onDeposit?.();
		} catch (error) {
			console.log(error);
			showAlert({
				color: 'danger',
				message: GENERIC_ERROR_MESSAGE,
			});
			return [];
		}
	};

	const {
		data: balance,
		loading: loadingBalance,
		setData: setBalance,
	} = useFetch(null, {
		async fetch() {
			return await WalletClientService.getBalance();
		},
	});

	useEffect(() => {
		const diff = purchasePrice - balance;
		if (diff > 0) {
			reset({
				amount: diff,
			});
		}
	}, [balance, purchasePrice]);

	return (
		<>
			<div className='flex flex-col justify-center items-center gap-3 mt-8 mb-3'>
				{loadingBalance ? (
					<Loader className='size-12' />
				) : (
					<>
						<Image
							src='/svg/wallet.svg'
							alt='wallet'
							width={100}
							height={100}
						/>
						<div
							className={twMerge(
								'font-semibold text-3xl',
								balance && 'text-success-dark'
							)}
						>
							{balance} MAD
						</div>
					</>
				)}
			</div>

			<hr className='my-5' />
			<div className='flex justify-end items-center'>
				<form
					className='flex justify-between gap-3'
					onSubmit={handleSubmit(handleDeposit)}
				>
					<Input
						{...register('amount')}
						placeholder='00,00'
						suffix={'DH'}
						className='w-28'
						inputClassName='text-xl'
						suffixClassName='text-xl'
						error={errors.amount?.message}
					/>
					<Button
						color='primary'
						icon='add'
						type='submit'
						loading={isSubmitting}
					>
						Add
					</Button>
				</form>
			</div>
		</>
	);
}

export default Balance;
