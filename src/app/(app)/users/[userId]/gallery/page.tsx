import Gallery from '@/components/gallery/Gallery';

interface Props {
	params: { userId: string };
}

async function Page({ params: { userId } }: Props) {
	// const posts = await PostServerService.getAll(userId);
	// if (!posts) redirect('/not-found');

	const images = [
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
		'/images/logo-big.png',
	];

	return <Gallery images={images} />;
}

export default Page;
