import React, { useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface RadioProps {
	className?: string;
	inputClassName?: string;
	label?: string;
	value?: string;
	onChange?: any;
	error?: any;
	name: string;
	required?: boolean;
	disabled?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			className,
			inputClassName,
			label,
			error = '',
			name,
			value,
			required = false,
			disabled = false,
		}: RadioProps,
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
						type='radio'
						id={id}
						name={name}
						value={value}
						className={twMerge(
							'mr-2 cursor-pointer',
							inputClassName,
							errorClassName
						)}
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

Radio.displayName = 'Radio';
