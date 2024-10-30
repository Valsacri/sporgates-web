'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../contexts/user.context';
import Loader from '@/components/utils/Loader';

const withNoAuth = (WrappedComponent: React.ComponentType) => {
	const WithNoAuth = (props: any) => {
		const [user] = useContext(UserContext);
		const router = useRouter();

		if (user === undefined) {
			return (
				<div className='w-screen h-screen flex justify-center items-center'>
					<Loader className='size-36' />
				</div>
			);
		}

		if (user) {
			return router.push('/');
		}

		return <WrappedComponent {...props} />; 
	};

	return WithNoAuth;
};

export default withNoAuth;
