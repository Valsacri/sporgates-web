import { statusMap } from '@/constants';
import { GroundRerservationStatus } from '@/types/item/ground/ground-reservation.types';
import { twMerge } from 'tailwind-merge';

interface Props {
	status?: GroundRerservationStatus | null;
	className?: string;
	children?: React.ReactNode;
}

function Status({ status, className, children }: Props) {
	const currentStatus = status ? statusMap[status] : null;

	return (
		<div
			className={twMerge(
				'capitalize flex items-center justify-center gap-1.5 rounded-md w-min px-2.5',
				currentStatus?.bgClassName,
				className
			)}
		>
			<span
				className={twMerge(
					'rounded-full size-2',
					currentStatus?.bulletClassName
				)}
			/>
			<span className={twMerge('text-[13px]', currentStatus?.textClassName)}>
				{children || currentStatus?.text}
			</span>
		</div>
	);
}

export default Status;
