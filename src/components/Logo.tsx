import Image from 'next/image';

function Logo({ width = 30, height = 30 }) {
	return (
		<Image src='/images/logo.png' width={width} height={height} alt='Sporgates logo' />
	);
}

export default Logo;
