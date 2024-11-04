import FeedGreetings from '@/components/feed/FeedGreetings';
import FeedMetrics from '@/components/feed/FeedMetrics';
import CreatePost from '@/components/feed/post/CreatePost';
import FeedFriendsSuggestions from '@/components/feed/post/FeedFriendsSuggestions';
import PostsFeed from '@/components/feed/post/PostsFeed';
import Statuses from '@/components/feed/status/Statuses';
import { AuthServerService } from '@/server/services/auth.server-service';
import { redirect } from 'next/navigation';

export default async function Home() {
	return redirect('/explore');

	await AuthServerService.verifyPageAuth();

	return (
		<>
			<div className='space-y-5'>
				<Statuses />
				<CreatePost />
				<FeedGreetings />
				{/* <PostFilters /> */}
				<PostsFeed />
			</div>

			<div className='hidden lg:block w-1/4 space-y-5'>
				<FeedMetrics />
				<FeedFriendsSuggestions />
			</div>
		</>
	);
}
