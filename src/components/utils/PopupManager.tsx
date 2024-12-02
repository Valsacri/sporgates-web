'use client';

import { usePopup } from '@/client/hooks/utils/usePopup';
import React from 'react';

interface PopupManagerProps {
	trigger: React.ReactNode;
	popup: React.ReactElement;
	triggerClassName?: string;
}

const PopupManager = ({
	trigger,
	triggerClassName,
	popup,
}: PopupManagerProps) => {
	const [open, toggleOpen] = usePopup();

	return (
		<>
			<div onClick={toggleOpen} className={triggerClassName}>
				{trigger}
			</div>
			{open && React.cloneElement(popup, { onClose: toggleOpen })}
		</>
	);
};

export default PopupManager;
