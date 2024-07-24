'use client';

import { useState } from 'react';

interface Props {
	children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
	return <>{children}</>;
}

export default ContextProvider;
