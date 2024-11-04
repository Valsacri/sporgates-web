import { twMerge } from 'tailwind-merge';

interface Props {
	title?: React.ReactNode;
	titleSuffix?: React.ReactNode;
	description?: string;
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => any;
}

function Card({
	children,
	title,
	titleSuffix,
	description,
	className,
	style,
	onClick,
}: Props) {
	return (
		<div
			className={twMerge('bg-white rounded-md p-4', className)}
			style={style}
			onClick={onClick}
		>
			{(title || titleSuffix) && (
				<div className='flex justify-between items-center'>
					<h2>{title}</h2>
					{titleSuffix}
				</div>
			)}

			{description && (
				<p className='text-text-secondary mt-2 mb-3'>{description}</p>
			)}

			{children}
		</div>
	);
}

export default Card;
