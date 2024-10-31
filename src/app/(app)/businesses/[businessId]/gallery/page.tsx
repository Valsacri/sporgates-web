import Gallery from '@/components/gallery/Gallery';

interface Props {
	params: { businessId: string };
}

async function Page({ params: { businessId } }: Props) {
	// const posts = await PostServerService.getAll(businessId);

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
