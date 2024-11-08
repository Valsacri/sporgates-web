import Logo from '../Logo';

function Splash() {
	return (
		<div className='h-screen w-screen flex flex-col justify-around items-center'>
			{/* <div/> */}
			<Logo hideLogo showText textWidth={250} />
			{/* <Logo size={50} /> */}
		</div>
	);
}

export default Splash;
