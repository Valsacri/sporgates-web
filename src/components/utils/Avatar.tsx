import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
	src?: string;
	size: number;
	className?: string;
}

function Avatar({ src, size, className }: Props) {
	return (
		<div
			className={twMerge('relative overflow-hidden rounded-full', className)}
			style={{ width: size, height: size }}
		>
			<Image
				src={src || '/images/avatar-placeholder.png'}
				layout='fill'
				objectFit='cover'
				objectPosition='center'
				alt='avatar'
			/>
		</div>
	);
}

export default Avatar;
