'use client';

import Button from '../utils/Button';
import { Popup } from '../utils/Popup';
import { useState } from 'react';

interface Props {
	open?: boolean;
	setOpen?: (open: boolean) => any;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	onConfirm: Function;
}

function ConfirmationPopup({
	open: _open,
	setOpen: _setOpen,
	title,
	description,
	children,
	onConfirm: _onConfirm,
}: Props) {
	const [__open, __setOpen] = useState(false);

	const open = _open ?? __open;
	const setOpen = _setOpen ?? __setOpen;

	const onConfirm = () => {
		_onConfirm();
		setOpen(false);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div onClick={() => setOpen(true)}>{children}</div>
			{open && (
				<Popup
					open={true}
					title={title || 'Are you sure?'}
					description={description || 'Click confirm to proceed.'}
					onClose={onClose}
					className='min-w-full lg:min-w-[400px]'
				>
					<div className='flex justify-end space-x-3'>
						<Button onClick={onConfirm} color='danger'>
							Confirm
						</Button>
						<Button onClick={onClose} color='secondary'>
							Cancel
						</Button>
					</div>
				</Popup>
			)}
		</>
	);
}

export default ConfirmationPopup;
