'use client';

import { AlertMessage } from '@/client/contexts/alert.context';
import React from 'react';
import {
	FaCircleCheck,
	FaCircleXmark,
	FaTriangleExclamation,
} from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

interface Props {
	children?: React.ReactNode;
	alert: AlertMessage | null;
	position?: 'left' | 'right';
	onClick?: () => void;
	className?: string;
}

const alerts = {
	success: { icon: FaCircleCheck, bgColor: 'bg-success' },
	warning: { icon: FaTriangleExclamation, bgColor: 'bg-danger' },
	danger: { icon: FaCircleXmark, bgColor: 'bg-warning' },
};

export const Alert = ({ alert, onClick, className }: Props) => {
	const bgColor = alerts[alert!.color].bgColor;

	const Icon = alert && alerts[alert.color].icon;

	return (
		<div
			className={twMerge(
				'fixed bottom-5 right-5 rounded-lg ml-5 px-5 py-3 text-white flex items-center gap-3 shadow-lg font-mono',
				className,
				bgColor,
				`${alert?.position}-5`,
				onClick && 'cursor-pointer'
			)}
			onClick={onClick}
		>
			{Icon && <Icon className='w-5 h-5' />}
			{alert?.message}
		</div>
	);
};
