'use client';

import { forwardRef } from 'react';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import Dropdown from '../Dropdown';
import { usePopup } from '@/client/hooks/utils/usePopup';
import Calendar from 'react-calendar';
import Card from '../Card';
import { formatDate, parseDate } from '@/helpers/datetime.helpers';
import { HiOutlineCalendar } from 'react-icons/hi2';

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
	onChange?: (date: string) => void;
	onBlur?: any;
	value?: string;

	label?: string;
	type?: DatePickerType;
	placeholder?: string;
	rounded?: boolean;
	error?: any;
	suffix?: any;
	suffixPos?: any;
	required?: boolean;
	disabled?: boolean;
}

export const DatePicker = forwardRef<
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
		}: Props,
		ref
	) => {
		const id = useId();

		const [openDatePicker, , setOpenDatePicker] = usePopup();

		const errorClassName = error && 'text-danger';

		const handleChange = (date: Date) => {
			const formattedDate = formatDate(date);
			onChange?.(formattedDate);
			setOpenDatePicker(false);
		};

		return (
			<div className={twMerge('w-full', className)}>
				<label htmlFor={id} className={twMerge('text-sm', labelClassName)}>
					{label}
				</label>

				<Dropdown
					open={openDatePicker}
					setOpen={setOpenDatePicker}
					className={twMerge('shadow-none', label && 'mt-1')}
					trigger={
						<div
							className={twMerge(
								'flex items-center gap-3 bg-secondary w-full h-[40px] rounded-md text-xs font-light px-3',
								label && 'mt-1',
								containerClassName
							)}
						>
							<input
								ref={ref as React.Ref<HTMLInputElement>}
								name={name}
								onBlur={onBlur}
								disabled={disabled}
								id={id}
								type={type}
								placeholder={placeholder}
								readOnly
								className={twMerge(
									'w-full rounded-md outline-none placeholder-text-secondary bg-transparent cursor-pointer',
									inputClassName
								)}
							/>

							{suffix || <HiOutlineCalendar className='size-5' />}
						</div>
					}
				>
					<Card className='border'>
						<Calendar
							minDate={new Date()}
							value={parseDate(value)}
							showFixedNumberOfWeeks
							onChange={(date) => handleChange(date as Date)}
						/>
					</Card>
				</Dropdown>

				{error && (
					<div className={twMerge('mt-2 text-xs', errorClassName)}>{error}</div>
				)}
			</div>
		);
	}
);

DatePicker.displayName = 'Input';
