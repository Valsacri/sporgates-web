import { twMerge } from 'tailwind-merge';

interface Props {
	status: string;
}

function Status({ status }: Props) {
	const statusMap = {
		ongoing: {
			textClassName: 'text-info-dark',
			bulletClassName: 'bg-info-dark',
			bgClassName: 'bg-info-light',
			text: 'Ongoing',
		},
		pending: {
			textClassName: 'text-text-secondary-dark',
			bulletClassName: 'bg-text-secondary-dark',
			bgClassName: 'bg-secondary',
			text: 'Pending',
		},
		accepted: {
			textClassName: 'text-success-dark',
			bulletClassName: 'bg-success-dark',
			bgClassName: 'bg-success-light',
			text: 'Accepted',
		},
		rejected: {
			textClassName: 'text-warning-dark',
			bulletClassName: 'bg-warning-dark',
			bgClassName: 'bg-warning-light',
			text: 'Rejected',
		},
		cancelled: {
			textClassName: 'text-danger-dark',
			bulletClassName: 'bg-danger-dark',
			bgClassName: 'bg-danger-light',
			text: 'Cancelled',
		},
	} as any;

	const currentStatus = statusMap[status];

	return (
		<div
			className={twMerge(
				'capitalize flex items-center justify-center gap-1.5 rounded-full w-min px-2.5',
				currentStatus?.bgClassName
			)}
		>
			<span
				className={twMerge(
					'rounded-full size-2',
					currentStatus?.bulletClassName
				)}
			/>
			<span className={twMerge('text-[13px]', currentStatus?.textClassName)}>
				{currentStatus?.text}
			</span>
		</div>
	);
}

export default Status;
