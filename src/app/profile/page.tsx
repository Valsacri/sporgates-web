import CreatePost from '@/components/feed/post/CreatePost';
import PostFilters from '@/components/feed/post/PostFilters';
import PostsFeed from '@/components/feed/post/PostsFeed';
import ProfileAlbums from '@/components/profile/ProfileAlbums';
import ProfileCompletion from '@/components/profile/ProfileCompletion';
import ProfileFriends from '@/components/profile/ProfileFriends';
import ProfileInfos from '@/components/profile/ProfileInfos';
import ProfileLikes from '@/components/profile/ProfileLikes';
import ProfileNavigation from '@/components/profile/ProfileNavigation';

export default function Home() {
	return (
		<div className='space-y-5'>
			<ProfileInfos />
			<ProfileNavigation />
			<ProfileCompletion />

			<div className='flex gap-5'>
				<div className='w-full lg:w-2/3 space-y-5'>
					<CreatePost />
					<PostFilters />
					<PostsFeed />
				</div>
				<div className='hidden lg:block w-1/3 space-y-5'>
					<ProfileFriends />
					<ProfileAlbums />
					<ProfileLikes />
					{/* <ProfileProducts /> */}
				</div>
			</div>
		</div>
	);
}
