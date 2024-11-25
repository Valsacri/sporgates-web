'use client';

import { AlertContext } from '@/client/contexts/alert.context';
import { AuthClientService } from '@/client/services/auth.client-service';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import { getAuth } from 'firebase/auth';
import { useContext, useState } from 'react';

function Page() {
	const showAlert = useContext(AlertContext);
	const [loading, setLoading] = useState(false);

	const handleSendPasswordResetEmail = async () => {
		setLoading(true);
		try {
			const email = getAuth().currentUser!.email!;
			await AuthClientService.sendPasswordResetEmail(email);

			showAlert({
				type: 'success',
				message: 'Your reset email has been sent',
			});
		} catch (error) {
			console.error(error);
			showAlert({
				type: 'danger',
				message: 'An error occurred while sending the reset email',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card title='Security settings'>
			<Button color='primary' onClick={handleSendPasswordResetEmail}>
				Send password reset email
			</Button>
		</Card>
	);
}

export default Page;
