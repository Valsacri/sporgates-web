'use client';

import React from 'react';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface Option {
	value: string | number;
	label: string;
}

interface SelectProps {
	className?: string;
	inputClassName?: string;
	label?: string;
	labelClassName?: string;
	value?: string | number;
	onChange?: (event: { target: any; type?: any }) => void;
	options: Option[];
	placeholder?: string;
	error?: string;
	name: string;
	disabled?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			className,
			inputClassName,
			label,
			labelClassName,
			value,
			onChange,
			options,
			placeholder = 'Select an option',
			error = '',
			name,
			disabled = false,
		}: SelectProps,
		ref
	) => {
		const id = useId();
		const errorClassName = error && 'text-danger';

		return (
			<div className={twMerge('w-full', className)}>
				{label && (
					<label htmlFor={id} className={twMerge('text-sm', labelClassName)}>
						{label}
					</label>
				)}

				<div className='flex items-center bg-secondary w-full h-[40px] rounded-md text-xs font-light px-3'>
					<select
						ref={ref}
						disabled={disabled}
						id={id}
						name={name}
						value={value}
						onChange={onChange}
						className={twMerge(
							'w-full rounded-md outline-none placeholder-text-secondary bg-transparent',
							inputClassName,
							errorClassName
						)}
					>
						<option value='' disabled hidden>
							{placeholder}
						</option>
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				{error && (
					<div className={twMerge('mt-2 text-xs', errorClassName)}>{error}</div>
				)}
			</div>
		);
	}
);

Select.displayName = 'Select';
