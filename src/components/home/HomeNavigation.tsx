import Card from '../utils/Card';
import Icon from '../utils/Icon';
import List from '../utils/List';

function HomeNavigation() {
	return (
		<Card className='px-0 py-3'>
			<List
				items={[
					{ prefix: <Icon name='home' />, item: 'Home' },
					{ prefix: <Icon name='gallery' />, item: 'Albums' },
					{ prefix: <Icon name='saved' />, item: 'Saved posts' },
					{ prefix: <Icon name='report' />, item: 'My page' },
					{ prefix: <Icon name='bag' />, item: 'Market' },
					{ prefix: <Icon name='discover' />, item: 'Explore' },
					{ prefix: <Icon name='calendar' />, item: 'Events' },
					{ prefix: <Icon name='star' />, item: 'Offers' },
					{ prefix: <Icon name='user-plus' />, item: 'Find friends' },
				]}
			/>
		</Card>
	);
}

export default HomeNavigation;
