import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
	src?: string;
	size?: number;
	className?: string;
}

function Avatar({ src, size = 24, className }: Props) {
	return (
		<div
			className={twMerge('relative overflow-hidden rounded-full', className)}
			style={{ width: size, height: size }}
		>
			<Image
				src={src || '/images/avatar-placeholder.png'}
				// src={'https://scontent.fcmn3-1.fna.fbcdn.net/v/t1.6435-9/69437351_2321678384759645_8993244025527992320_n.png?stp=dst-png_s1080x2048&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGZoADKfVKlzR_5dFj9kX0tz-AwCt4HYa_P4DAK3gdhrxFNbkJFPMMvzlGEXgsyHxKkNuZImW_UoBxMUrp6Gf8-&_nc_ohc=wb2BMUMwktYQ7kNvgFfjtyy&_nc_zt=23&_nc_ht=scontent.fcmn3-1.fna&_nc_gid=ACEWrOmH7XfWoiKOd0qwzLG&oh=00_AYDrvXgIcQQxPg3UFF8qbaLoYI6_FzxzlcsbVu4oKBl3eQ&oe=674B43DE'}
				layout='fill'
				objectFit='cover'
				objectPosition='center'
				alt='avatar'
			/>
		</div>
	);
}

export default Avatar;
