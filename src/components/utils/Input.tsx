'use client';

import React from 'react';
import { forwardRef, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputType =
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week';

interface Props {
	className?: string;
	textClassName?: string;
	label?: string;
	value?: string | number;
	onChange?: any;
	type?: InputType;
	placeholder?: string;
	rounded?: boolean;
	error?: any;
	name: string;
	suffix?: any;
	suffixPos?: any;
	required?: boolean;
	rows?: number;
	min?: number;
	max?: number;
	disabled?: boolean;
	onClickEnter?: any;
	onClick?: any;
}

export const Input = ({
	className,
	textClassName,
	value,
	onChange,
	type = 'text',
	placeholder = '',
	error = '',
	name,
	suffix,
	rows = 0,
	min = 0,
	max,
	disabled = false,
	onClickEnter,
	onClick,
}: Props) => {
	const id = useId();

	const errorClassName = error && 'text-danger';

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			onClickEnter?.();
		}
	};

	const finalValue = type === 'number' ? Number(value) : value || '';

	return (
		<div
			className={twMerge('w-full', className, textClassName, errorClassName)}
		>
			<div className='relative w-full'>
				<div className='flex items-center bg-secondary w-full h-[40px] rounded-lg text-xs font-light px-3'>
					{rows ? (
						<textarea
							disabled={disabled}
							id={id}
							// ref={ref}
							placeholder={placeholder}
							onChange={(e) => onChange(name, e.currentTarget.value)}
							value={finalValue}
							className={twMerge(
								'w-full h-full rounded-lg outline-none placeholder-neutral-500 bg-transparent',
								textClassName,
								errorClassName
							)}
							rows={rows}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<input
							disabled={disabled}
							id={id}
							type={type}
							min={min}
							max={max}
							placeholder={placeholder}
							onChange={(e) => onChange(name, e.currentTarget.value)}
							value={finalValue}
							className={twMerge(
								'w-full h-full rounded-lg outline-none placeholder-neutral-500 bg-transparent',
								textClassName,
								errorClassName,
								onClick && 'cursor-pointer'
							)}
							onClick={onClick}
							onKeyDown={handleKeyDown}
						/>
					)}
					{suffix}
				</div>
			</div>
			{error && <div className='mt-2  text-sm font-medium'>{error}</div>}
		</div>
	);
};
