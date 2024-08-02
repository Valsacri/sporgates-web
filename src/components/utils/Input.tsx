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
			<div
				className={twMerge('w-full', className, textClassName, errorClassName)}
			>
				<div className='relative w-full'>
					<div className='flex items-center bg-secondary w-full h-[40px] rounded-md text-xs font-light px-3'>
						{rows ? (
							<textarea
								ref={ref as React.Ref<HTMLTextAreaElement>}
								disabled={disabled}
								id={id}
								placeholder={placeholder}
								onChange={onChange}
								value={value}
								className={twMerge(
									'w-full rounded-md outline-none placeholder-text-secondary bg-transparent',
									textClassName,
									errorClassName
								)}
								rows={rows}
								onKeyDown={handleKeyDown}
							/>
						) : (
							<input
								ref={ref as React.Ref<HTMLInputElement>}
								disabled={disabled}
								id={id}
								type={type}
								min={min}
								max={max}
								placeholder={placeholder}
								onChange={onChange}
								value={value}
								className={twMerge(
									'w-full rounded-md outline-none placeholder-text-secondary bg-transparent',
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
				{error && <div className='mt-2 text-sm font-medium'>{error}</div>}
			</div>
		);
	}
);

Input.displayName = 'Input';
