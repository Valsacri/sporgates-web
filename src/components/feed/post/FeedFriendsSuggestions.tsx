import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';

function FeedFriendsSuggestions() {
	const suggestions = [
		{
			id: 1,
			name: 'Taha Hafdane',
			mutualFriends: 1,
		},
		{
			id: 2,
			name: 'Yassine Ejjoude',
			mutualFriends: 3,
		},
		{
			id: 3,
			name: 'Mohamed Mouki',
			mutualFriends: 2,
		},
	];

	return (
		<Card className='space-y-3' title='People you may know'>
			{suggestions.map((suggestion) => (
				<div className='flex justify-between' key={suggestion.id}>
					<div className='flex gap-3 items-center'>
						<img
							src='https://sporgates.com/upload/photos/d-avatar.jpg?cache=0'
							alt='avatar'
							className='rounded-full h-10 w-10'
						/>
						<div>
							<h4>{suggestion.name}</h4>
							<span className='text-sm text-text-secondary'>
								{suggestion.mutualFriends} mutual friend
							</span>
						</div>
					</div>

					<Button icon='user-plus' />
				</div>
			))}
		</Card>
	);
}

export default FeedFriendsSuggestions;
