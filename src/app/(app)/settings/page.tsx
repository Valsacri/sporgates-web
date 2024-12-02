import { redirect } from 'next/navigation';

function page() {
	return redirect('/settings/profile');
}

export default page;
