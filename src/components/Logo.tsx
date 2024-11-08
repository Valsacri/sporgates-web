import Image from 'next/image';

function Logo({
	size = 24,
	showText = false,
	hideLogo = false,
	textHeight = 24,
	textWidth = 150,
}) {
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
					height={textHeight}
					width={textWidth}
				/>
			)}
		</div>
	);
}

export default Logo;
