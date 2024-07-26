import CreatePost from '@/components/feed/post/CreatePost';
import PostsFeed from '@/components/feed/post/PostsFeed';
import PageGrounds from '@/components/page/PageGrounds';
import Buttons from '@/components/profile/Buttons';
import ProfileAlbums from '@/components/profile/ProfileAlbums';
import ProfileFriends from '@/components/profile/ProfileFriends';
import ProfileInfos from '@/components/profile/ProfileInfos';
import ProfileLikes from '@/components/profile/ProfileLikes';
import Card from '@/components/utils/Card';

export default function Page() {
	return (
		<div className='space-y-5'>
			<ProfileInfos type='page' />

			<Card>
				<Buttons
					stretch
					items={[
						{ icon: 'home', text: 'Home', href: '' },
						{ icon: 'document', text: 'Posts', href: '' },
						{ icon: 'location', text: 'Grounds', href: '' },
						{ icon: 'todo', text: 'Services', href: '' },
						{ icon: 'gallery', text: 'Gallery', href: '' },
					]}
				/>
			</Card>

			<PageGrounds />

			<div className='flex gap-5'>
				<div className='w-full lg:w-2/3 space-y-5'>
					<CreatePost />
					{/* <PostFilters /> */}
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
