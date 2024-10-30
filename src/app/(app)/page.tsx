import FeedGreetings from '@/components/feed/FeedGreetings';
import FeedMetrics from '@/components/feed/FeedMetrics';
import CreatePost from '@/components/feed/post/CreatePost';
import FeedFriendsSuggestions from '@/components/feed/post/FeedFriendsSuggestions';
import PostsFeed from '@/components/feed/post/PostsFeed';
import Statuses from '@/components/feed/status/Statuses';
import HomeNavigation from '@/components/home/HomeNavigation';
import { AuthServerService } from '@/server/services/auth.server-service';

export default async function Home() {
	await AuthServerService.verifyPageAuth();

	return (
		<div className='flex gap-5'>
			<div className='hidden lg:block w-1/4'>
				<HomeNavigation />
			</div>

			<div className='w-full lg:w-1/2 space-y-5'>
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
		</div>
	);
}
