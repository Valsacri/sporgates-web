'use client';

import { UserContext } from '@/contexts/user.context';

interface Props {
	children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
	// const [user, setUser] = userUser();
	const [user, setUser] = [undefined, () => {}];

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
}

export default ContextProvider;
