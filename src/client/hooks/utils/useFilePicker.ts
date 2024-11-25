'use client';

import { useRef, useState } from 'react';

export function useFilePicker() {
	const [loading, setLoading] = useState(false);

	const ref = useRef<HTMLInputElement>(null);

	const handleOpen = () => {
		if (ref.current) {
			ref.current.click();
		}
	};

	const toggleLoading = () => {
		setLoading(!loading);
	};

	return { ref, handleOpen, loading, toggleLoading } as const;
}
