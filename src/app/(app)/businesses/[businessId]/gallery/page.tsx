import Gallery from '@/components/gallery/Gallery';

interface Props {
	params: { businessId: string };
}

async function Page({ params: { businessId } }: Props) {
	// const posts = await PostServerService.getAll(businessId);

	const images = [
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
	];

	return <Gallery images={images} />;
}

export default Page;
