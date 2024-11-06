import Image from 'next/image';

function Logo({ width = 24, height = 24 }) {
	return (
		<Image src='/images/logo.png' width={width} height={height} alt='Sporgates logo' />
	);
}

export default Logo;
