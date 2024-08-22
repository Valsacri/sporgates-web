'use client';

import React, { useState } from 'react';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import Dropdown from '../Dropdown';
import { usePopup } from '@/client/hooks/utils/usePopup';
import Calendar from 'react-calendar';

export type DatePickerType =
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
	type?: DatePickerType;
	placeholder?: string;
	rounded?: boolean;
	error?: any;
	suffix?: any;
	suffixPos?: any;
	required?: boolean;
	disabled?: boolean;
	onClickEnter?: any;
	onClick?: any;
}

export const DatePicker = React.forwardRef<
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
			disabled = false,
			onClickEnter,
			onClick,
		}: Props,
		ref
	) => {
		const id = useId();

		const [openDatePicker, toggleDatePicker] = usePopup();
		const [selectedDate, setSelectedDate] = useState(new Date());

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
					<Dropdown
						open={openDatePicker}
						setOpen={toggleDatePicker}
						containerClassName='w-1/2'
						className='shadow-none'
						closeOnClick
						trigger={
							<input
								ref={ref as React.Ref<HTMLInputElement>}
								name={name}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								disabled={disabled}
								id={id}
								type={type}
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
						}
					>
						<Calendar
							minDate={new Date()}
							showFixedNumberOfWeeks
							onChange={(date) => setSelectedDate(date as Date)}
						/>
					</Dropdown>

					{suffix}
				</div>

				{error && (
					<div className={twMerge('mt-2 text-xs', errorClassName)}>{error}</div>
				)}
			</div>
		);
	}
);

DatePicker.displayName = 'Input';
