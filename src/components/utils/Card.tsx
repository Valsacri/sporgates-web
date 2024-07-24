import { twMerge } from 'tailwind-merge';

interface Props {
	title?: string;
	titleSuffix?: string;
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => any;
}

function Card({
	children,
	title,
	titleSuffix,
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

			{children}
		</div>
	);
}

export default Card;
