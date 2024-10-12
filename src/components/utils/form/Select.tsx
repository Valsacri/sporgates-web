'use client';

import { forwardRef, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import List, { ListItem } from '../List';
import Dropdown from '../Dropdown';
import { HiChevronDown } from 'react-icons/hi2';

export interface SelectOption {
	value: string;
	label: string;
}

interface Props {
	className?: string;
	inputClassName?: string;
	label?: string;
	labelClassName?: string;
	containerClassName?: string;
	value?: string;
	onBlur?: any;
	onChange?: (value: string) => void;
	options: SelectOption[];
	placeholder?: string;
	error?: string;
	name?: string;
	disabled?: boolean;
	suffix?: any;
	suffixPos?: any;
}

export const Select = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
	(
		{
			className,
			inputClassName,
			label,
			labelClassName,
			containerClassName,
			name,
			onChange,
			onBlur,
			value,
			options,
			placeholder,
			error = '',
			disabled = false,
			suffix,
		}: Props,
		ref
	) => {
		const id = useId();

		const [open, setOpen] = useState(false);

		const handleSelect = (selectedValue: string) => {
			onChange?.(selectedValue);
			setOpen(false);
		};

		const listItems: ListItem[] = options.map((option) => ({
			item: option.label,
			onClick: () => handleSelect(option.value),
			className: 'text-sm',
		}));

		const displayValue = options.find(
			(option) => option.value === value
		)?.label;

		return (
			<div className={twMerge('w-full', className)}>
				{label && (
					<label htmlFor={id} className={twMerge('text-sm', labelClassName)}>
						{label}
					</label>
				)}

				<Dropdown
					open={open}
					setOpen={setOpen}
					className={twMerge('shadow-none', label && 'w-full mt-1')}
					trigger={
						<div
							className={twMerge(
								'w-full h-[40px] flex items-center gap-3 bg-secondary rounded-md text-xs font-light px-3',
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
								value={displayValue}
								placeholder={placeholder}
								readOnly
								className={twMerge(
									'w-full rounded-md outline-none placeholder-text-secondary bg-transparent cursor-pointer',
									inputClassName
								)}
							/>

							{suffix || <HiChevronDown className='size-5' />}
						</div>
					}
				>
					<List items={listItems} className='border rounded-xl' />
				</Dropdown>

				{error && (
					<div className={twMerge('mt-2 text-xs text-danger')}>{error}</div>
				)}
			</div>
		);
	}
);

Select.displayName = 'Select';
