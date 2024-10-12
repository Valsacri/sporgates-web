import { twMerge } from 'tailwind-merge';

interface Props {
	title?: string;
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
			className={twMerge('bg-white rounded-xl p-5', className)}
			style={style}
			onClick={onClick}
		>
			{(title || titleSuffix) && (
				<div className='flex justify-between items-center mb-2'>
					<h2>{title}</h2>
					{titleSuffix}
				</div>
			)}

			{description && <p className='text-text-secondary mb-3'>{description}</p>}

			{children}
		</div>
	);
}

export default Card;
