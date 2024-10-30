import Gallery from '@/components/gallery/Gallery';
import { BusinessModel } from '@/server/models/business.model';
import { UserServerService } from '@/server/services/user.server-service';
import { User } from '@/types/user.types';
import Image from 'next/image';
import { redirect } from 'next/navigation';

interface Props {
	params: { userId: string };
}

async function Page({ params: { userId } }: Props) {
	// const posts = await PostServerService.getAll(userId);
	// if (!posts) redirect('/not-found');

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
