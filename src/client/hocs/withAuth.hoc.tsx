'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../contexts/user.context';

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
			return null
		}

		return user ? <WrappedComponent {...props} /> : null; // Render wrapped component if authenticated
	};

	return WithAuth;
};

export default withAuth;
