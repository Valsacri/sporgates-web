'use client';

import { useContext } from 'react';
import { Input } from '../utils/form/Input';
import Icon from '../utils/Icon';
import Dropdown from '../utils/Dropdown';
import List, { ListItem } from '../utils/List';
import { useFetch } from '@/client/hooks/utils/useFetch';
import { useForm } from 'react-hook-form';
import { GENERIC_ERROR_MESSAGE } from '@/constants';
import { AlertContext } from '@/client/contexts/alert.context';
import Avatar from '../utils/Avatar';
import { SearchClientService } from '@/client/services/search.client-service';
import Loader from '../utils/Loader';
import { User } from '@/types/user.types';

function Search() {
	const showAlert = useContext(AlertContext);

	const { register, watch, reset } = useForm({
		defaultValues: {
			keywords: '',
		},
	});

	const keywords = watch('keywords');

	const { data: results, loading } = useFetch(
		{
			users: [],
			businesses: [],
		},
		{
			async fetch() {
				try {
					if (!keywords) return [];
					const results = await SearchClientService.search(keywords);
					return [...results.users, ...results.businesses];
				} catch (error) {
					console.error(error);
					showAlert({
						type: 'danger',
					});
					return [];
				}
			},
		},
		[keywords]
	);

	return (
		<div className='space-y-1'>
			<Input
				{...register('keywords')}
				placeholder='Search for champs, grounds, clubs and more...'
				suffix={loading ? <Loader /> : <Icon name='search' />}
			/>

			{results.length > 0 && keywords && (
				<Dropdown open={true} className='w-full' closeOnClick>
					<List
						items={results.map((result) => {
							return {
								prefix: <Avatar src={result.avatar} size={35} />,
								item: (
									<div>
										<div className='text-sm text-text-secondary-dark'>
											{result.name}
										</div>
										<div className='text-xs text-text-secondary'>
											@{result.username}
										</div>
									</div>
								),
								href: (result as User).uid
									? `/users/${result.id}`
									: `/businesses/${result.id}`,
							} as ListItem;
						})}
					/>
				</Dropdown>
			)}
		</div>
	);
}

export default Search;
