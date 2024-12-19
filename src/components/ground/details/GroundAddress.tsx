import Icon from '@/components/utils/Icon';
import MapboxMap from '@/components/utils/Map';
import { Address, City, Town } from '@/types/geo.types';

interface Props {
	address?: Address;
}

function GroundAddress({ address }: Props) {
	const formattedAddress = !address
		? ''
		: [
				address.street,
				(address.town as Town).name,
				address.zip,
				(address.city as City).name,
		  ]
				.filter(Boolean)
				.join(', ');

	return (
		<div className='space-y-3'>
			<MapboxMap
				lat={address?.geoLocation.lat}
				lng={address?.geoLocation.lng}
			/>
			{formattedAddress && (
				<div className='text-sm flex items-end justify-end gap-1'>
					<Icon name='location' />
					{formattedAddress}
				</div>
			)}
		</div>
	);
}

export default GroundAddress;
