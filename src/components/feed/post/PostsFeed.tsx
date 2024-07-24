import { IPost } from '@/types/post.interface';
import Post from './Post';

function PostsFeed() {
	const posts: IPost[] = [
		{
			id: '1',
			title: 'Post 1',
			subject: 'new-offer',
			date: '5 w',
			body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
			isPromoted: false,
			image:
				'https://sporgates.com/upload/photos/2024/07/TyKIk82oeZ2gimY4YKkC_11_f453d65787a01503bb2b6cfbaf51563e_image.png',
			offer: {
				originalPrice: 999,
				discount: 599,
				disountType: 'amount',
				endDate: '5 w',
			},
		},
		{
			id: '2',
			title: 'Post 2',
			subject: 'donation-request',
			date: '5 w',
			body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
			isPromoted: true,
			image:
				'https://sporgates.com/upload/photos/2024/07/TyKIk82oeZ2gimY4YKkC_11_f453d65787a01503bb2b6cfbaf51563e_image.png',
		},
		{
			id: '3',
			title: 'Post 3',
			subject: 'new-product',
			date: '5 w',
			body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
			isPromoted: false,
			image: '',
		},
		{
			id: '4',
			title: 'Post 4',
			subject: 'update-profile-photo',
			date: '5 w',
			body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
			isPromoted: false,
			image: '',
		},
		{
			id: '5',
			title: 'Post 5',
			subject: 'new-post',
			date: '5 w',
			body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
			isPromoted: false,
			image: '',
		},
		{
			id: '6',
			title: 'Post 6',
			subject: 'new-offer',
			date: '5 w',
			body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime in fugiat ipsam, nostrum quod accusamus explicabo sapiente eligendi rem, vel natus velit, odio delectus modi et veniam consequatur? Quidem?',
			isPromoted: false,
			image: '',
			offer: {
				originalPrice: 999,
				discount: 30,
				disountType: 'percentage',
				endDate: '5 w',
			},
		},
	];

	return (
		<>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}

			<div className='text-center text-sm text-text-secondary'>
				No more posts
			</div>
		</>
	);
}

export default PostsFeed;
