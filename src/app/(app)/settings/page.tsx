import { redirect } from 'next/navigation';

function page() {
	return redirect('/settings/general');
}

export default page;
