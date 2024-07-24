import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
	src: string;
	size: number;
	className?: string;
}

function Avatar({ src, size, className }: Props) {
	return (
		<Image
			src={src}
			width={size}
			height={size}
			alt='avatar'
			className={twMerge('rounded-full', className)}
		/>
	);
}

export default Avatar;
