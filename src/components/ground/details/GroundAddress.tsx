import Card from '@/components/utils/Card';
import MapboxMap from '@/components/utils/Map';
import { Address } from '@/types/general.types';

interface Props {
	address: Address;
}

function GroundAddress({ address }: Props) {
	return (
		<Card title='Address' className='space-y-3'>
			<MapboxMap lat={address.geoLocation.lat} lng={address.geoLocation.lng} />
			<p className='text-sm'>{`${address.street}, ${address.neighborhood}, ${address.zip} ${address.city}, ${address.country}`}</p>
		</Card>
	);
}

export default GroundAddress;
