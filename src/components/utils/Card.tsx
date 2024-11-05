import { twMerge } from 'tailwind-merge';

interface Props {
	title?: React.ReactNode;
	titleSuffix?: React.ReactNode;
	description?: string;
	children?: React.ReactNode;
	className?: string;
	bodyClassName?: string;
	style?: React.CSSProperties;
	onClick?: () => any;
}

function Card({
	children,
	title,
	titleSuffix,
	description,
	className,
	bodyClassName,
	style,
	onClick,
}: Props) {
	return (
		<div
			className={twMerge('bg-white rounded-md p-4', className)}
			style={style}
			onClick={onClick}
		>
			{(title || titleSuffix || description) && (
				<div className='space-y-1 mb-3'>
					{(title || titleSuffix) && (
						<div className='flex justify-between items-center'>
							<h2>{title}</h2>
							{titleSuffix}
						</div>
					)}
					{description && (
						<p className='text-sm text-text-secondary-dark'>{description}</p>
					)}
				</div>
			)}

			<div className={bodyClassName}>{children}</div>
		</div>
	);
}

export default Card;
