'use client';

import React from 'react';
import { useId } from 'react';
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
	inputClassName?: string;
	containerClassName?: string;
	labelClassName?: string;

	name?: string;
	onChange?: any;
	onBlur?: any;
	value?: string | number;

	label?: string;
	type?: InputType;
	placeholder?: string;
	rounded?: boolean;
	error?: any;
	suffix?: any;
	suffixPos?: any;
	required?: boolean;
	rows?: number;
	min?: string | number;
	max?: string | number;
	disabled?: boolean;
	onClickEnter?: any;
	onClick?: any;
}

export const Input = React.forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	Props
>(
	(
		{
			className,
			inputClassName,
			containerClassName,
			labelClassName,
			name,
			onChange,
			onBlur,
			value,
			type = 'text',
			placeholder = '',
			error = '',
			label,
			suffix,
			rows = 0,
			min = 0,
			max,
			disabled = false,
			onClickEnter,
			onClick,
		}: Props,
		ref
	) => {
		const id = useId();
		const errorClassName = error && 'text-danger';

		const handleKeyDown = (e: any) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				onClickEnter?.();
			}
		};

		return (
			<div className={twMerge('w-full', className)}>
				{label && (
					<label htmlFor={id} className={twMerge('text-sm', labelClassName)}>
						{label}
					</label>
				)}

				<div
					className={twMerge(
						'flex items-center bg-secondary w-full h-[40px] rounded-md text-xs font-light px-3',
						label && 'mt-1',
						containerClassName
					)}
				>
					{rows ? (
						<textarea
							ref={ref as React.Ref<HTMLTextAreaElement>}
							name={name}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							disabled={disabled}
							id={id}
							placeholder={placeholder}
							className={twMerge(
								'w-full rounded-md outline-none placeholder-text-secondary bg-transparent',
								inputClassName,
							)}
							rows={rows}
						/>
					) : (
						<input
							ref={ref as React.Ref<HTMLInputElement>}
							name={name}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							disabled={disabled}
							id={id}
							type={type}
							min={min}
							max={max}
							placeholder={placeholder}
							className={twMerge(
								'w-full rounded-md outline-none placeholder-text-secondary bg-transparent',
								inputClassName,
								errorClassName,
								onClick && 'cursor-pointer'
							)}
							onClick={onClick}
							onKeyDown={handleKeyDown}
						/>
					)}
					{suffix}
				</div>

				{error && (
					<div className={twMerge('mt-2 text-xs', errorClassName)}>{error}</div>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
