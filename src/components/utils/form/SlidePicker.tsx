'use client';

import React, { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
	className?: string;
	sliderClassName?: string;
	containerClassName?: string;
	labelClassName?: string;

	name?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: any;
	value?: number;
	min?: number;
	max?: number;
	step?: number;

	label?: string;
	disabled?: boolean;
	error?: string;

	// This prop will be used for react-hook-form's register
	register?: UseFormRegisterReturn;
}

export const SlidePicker = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className,
			sliderClassName,
			containerClassName,
			labelClassName,
			name,
			onChange,
			onBlur,
			value = 0,
			min = 0,
			max = 100,
			step = 1,
			label,
			disabled = false,
			error = '',
		},
		ref
	) => {
		const id = useId();
		const errorClassName = error && 'text-danger';

		const percentage = ((value - min) / (max - min)) * 100;

		return (
			<div className={twMerge('w-full', className)}>
				<div className='flex justify-between'>
					{label && (
						<label htmlFor={id} className={twMerge('text-sm', labelClassName)}>
							{label}
						</label>
					)}
					{value && (
						<div className={twMerge('text-sm', labelClassName)}>{value}</div>
					)}
				</div>

				<div
					className={twMerge(
						'flex items-center w-full min-h-[40px] rounded-md',
						label && 'mt-1',
						containerClassName
					)}
				>
					<input
						ref={ref as React.Ref<HTMLInputElement>}
						type='range'
						name={name}
						id={id}
						min={min}
						max={max}
						step={step}
						value={value}
						disabled={disabled}
						onChange={onChange}
						onBlur={onBlur}
						className={twMerge(
							'w-full appearance-none rounded-md bg-transparent focus:outline-none',
							'slider-thumb h-2 rounded bg-primary',
							sliderClassName
						)}
						style={{
							WebkitAppearance: 'none',
							background: `linear-gradient(to right, #3A5E8C ${percentage}%, #F5F5F5 ${percentage}%)`,
						}}
					/>
				</div>

				{error && (
					<div className={twMerge('mt-2 text-xs', errorClassName)}>{error}</div>
				)}
			</div>
		);
	}
);

SlidePicker.displayName = 'SlidePicker';
