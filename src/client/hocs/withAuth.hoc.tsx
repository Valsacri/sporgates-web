'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../contexts/user.context';
import Loader from '@/components/utils/Loader';

const withAuth = (WrappedComponent: React.ComponentType) => {
	const WithAuth = (props: any) => {
		const [user] = useContext(UserContext);
		const router = useRouter();

		useEffect(() => {
			// If not loading and no user, redirect to sign-in page
			if (user === null) {
				router.push('/sign-in');
			}
		}, [user]);

		if (user === undefined) {
			return (
				<div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center'>
					<Loader className='size-20'/>
				</div>
			); // Optional: Show a loading state
		}

		return user ? <WrappedComponent {...props} /> : null; // Render wrapped component if authenticated
	};

	return WithAuth;
};

export default withAuth;
