import Image from 'next/image';

function Logo({ size = 24, showText = false, hideLogo = false }) {
	return (
		<div className='flex items-center gap-3'>
			{!hideLogo && (
				<Image
					src='/images/logo.png'
					width={size}
					height={size}
					alt='Sporgates logo'
				/>
			)}
			{showText && (
				<Image
					src='/images/logo-text.png'
					alt='Logo text'
					height={24}
					width={150}
				/>
			)}
		</div>
	);
}

export default Logo;
