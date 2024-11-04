import GroundsList from '@/components/ground/GroundsList';
import { BusinessModel } from '@/server/models/business.model';
import { GroundServerService } from '@/server/services/ground.server-service';
import { redirect } from 'next/navigation';

interface Props {
	params: { businessId: string };
}

async function Page({ params }: Props) {
	const business = await GroundServerService.getPage({
		business: params.businessId,
	});
	if (!business) redirect('/not-found');

	return <GroundsList />;
}

export default Page;
