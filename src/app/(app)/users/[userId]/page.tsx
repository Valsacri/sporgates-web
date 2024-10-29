import { redirect } from 'next/navigation';

interface Props {
	params: { userId: string };
}

export default function Page({ params }: Props) {
	const userId = params.userId;
	return redirect(`/users/${userId}/gallery`);
}
