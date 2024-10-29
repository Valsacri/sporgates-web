import { redirect } from 'next/navigation';

interface Props {
	params: { businessId: string };
}

export default function Page({ params }: Props) {
	const businessId = params.businessId;
	return redirect(`/businesses/${businessId}/gallery`);
}
