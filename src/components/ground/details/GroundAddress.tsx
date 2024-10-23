import Card from '@/components/utils/Card';
import MapboxMap from '@/components/utils/Map';
import { Address, City, GeoLocation, Town } from '@/types/geo.types';

interface Props {
	address: Address;
}

function GroundAddress({ address }: Props) {
	const formattedAddress = [
		address.street,
		(address.town as Town).name,
		address.zip,
		(address.city as City).name,
	]
		.filter(Boolean)
		.join(', ');

	return (
		<Card title='Address' className='space-y-3'>
			<MapboxMap lat={address.geoLocation.lat} lng={address.geoLocation.lng} />
			<p className='text-sm'>{formattedAddress}</p>
		</Card>
	);
}

export default GroundAddress;
