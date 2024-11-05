'use client';

import { useState } from 'react';

export const useToggler = () => {
	const [state, setState] = useState(false);

	const toggle = () => {
		setState((state) => !state);
	};

	return [state, toggle] as const;
};
