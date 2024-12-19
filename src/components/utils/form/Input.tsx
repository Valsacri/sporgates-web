'use client';

import React, { useRef, useId, useEffect } from 'react';
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
	suffixClassName?: string;
	required?: boolean;
	multiline?: boolean;
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
			suffixClassName,
			required = false,
			multiline,
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

		// Automatically adjusts the textarea height as the user types
		const textareaRef = useRef<HTMLTextAreaElement | null>(null);
		const adjustTextareaHeight = () => {
			if (textareaRef.current) {
				textareaRef.current.style.height = 'auto'; // Reset to auto to calculate scroll height
				textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Dynamically adjust height
			}
		};

		const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			adjustTextareaHeight();
			onChange?.(e); // Pass event to the onChange prop
		};

		// Effect to resize the textarea when value changes programmatically or from the parent
		useEffect(() => {
			adjustTextareaHeight();
		}, [value]);

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
						{label} {required && '*'}
					</label>
				)}

				<div
					className={twMerge(
						'flex items-center bg-secondary w-full min-h-[40px] rounded-md text-xs font-light px-3',
						label && 'mt-1',
						containerClassName
					)}
				>
					{multiline ? (
						<textarea
							ref={(el) => {
								textareaRef.current = el;
								if (typeof ref === 'function') {
									ref(el);
								} else if (ref) {
									ref.current = el;
								}
							}}
							name={name}
							onChange={handleInput}
							onBlur={onBlur}
							value={value}
							disabled={disabled}
							id={id}
							placeholder={placeholder}
							rows={1}
							className={twMerge(
								'w-full rounded-md outline-none placeholder-text-secondary bg-transparent resize-none', // Disable manual resize
								inputClassName
							)}
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
					<div className={suffixClassName}>{suffix}</div>
				</div>

				{error && (
					<div className={twMerge('mt-2 text-xs', errorClassName)}>{error}</div>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
