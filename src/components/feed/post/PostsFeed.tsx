import { POSTS } from '@/data/posts';
import PostCard from './Post';

function PostsFeed() {
	return (
		<>
			{POSTS.map((post, index) => (
				<PostCard key={index} post={post} />
			))}

			<div className='text-center text-sm text-text-secondary'>
				No more posts
			</div>
		</>
	);
}

export default PostsFeed;
