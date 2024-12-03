import GroundCard from '@/components/ground/GroundCard';
import GroundForm from '@/components/ground/manage/GroundForm';
import Button from '@/components/utils/Button';
import { Popup } from '@/components/utils/Popup';
import { GroundServerService } from '@/server/services/ground.server-service';
import { Ground } from '@/types/item/ground/ground.types';
import { redirect } from 'next/navigation';

interface Props {
	params: { businessId: string };
}

async function Page({ params }: Props) {
	let grounds: Ground[];

	try {
		grounds = await GroundServerService.getPage({
			business: params.businessId,
		});
	} catch (error) {
		console.error(error);
		return redirect('/server-error');
	}

	return (
		<>
			<Popup
				title='Create a ground'
				description='Fill in the details to create a new ground.'
				trigger={
					<Button
						icon='plus'
						color='primary'
						className='fixed bottom-5 right-5 p-7 rounded-full'
						iconClassName='!size-12'
					></Button>
				}
			>
				<GroundForm businessId={params.businessId} />
			</Popup>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
				{grounds.map((ground, i) => (
					<GroundCard key={i} ground={ground} />
				))}
			</div>
		</>
	);
}

export default Page;
