'use client';

import Gallery from '@/components/gallery/Gallery';

function Page() {
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
