import React, { useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
	className?: string;
	inputClassName?: string;
	label?: string;
	value?: string | number;
	onChange?: any;
	error?: any;
	name: string;
	required?: boolean;
	disabled?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className,
			inputClassName,
			label,
			error = '',
			name,
			required = false,
			disabled = false,
		}: Props,
		ref
	) => {
		const id = useId();
		const errorClassName = error && 'text-danger';

		return (
			<div
				className={twMerge('w-full', className, inputClassName, errorClassName)}
			>
				<div className='relative w-full flex items-center'>
					<input
						ref={ref}
						type='checkbox'
						id={id}
						name={name}
						className={twMerge('mr-2 size-4 cursor-pointer', inputClassName, errorClassName)}
						disabled={disabled}
						aria-invalid={error ? 'true' : 'false'}
					/>
					{label && (
						<label htmlFor={id} className='text-sm cursor-pointer'>
							{label}
						</label>
					)}
				</div>
				{error && <div className='mt-2 text-xs'>{error}</div>}
			</div>
		);
	}
);

Checkbox.displayName = 'Checkbox';
