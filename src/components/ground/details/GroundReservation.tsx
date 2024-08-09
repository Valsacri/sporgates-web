import Reservation from '@/components/shared/Reservation';
import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';

function GroundReservation() {
	return (
		<Card>
			<h3 className='mb-3 text-end'>50 DH/h</h3>
			<Reservation />

			<Button icon='check' color='primary' className='w-full mt-5'>
				Reserve now
			</Button>

			<hr className='my-5' />

			<div className='flex justify-between'>
				<h3>Total</h3>
				<p className='text-success'>125 DH</p>
			</div>
		</Card>
	);
}

export default GroundReservation;
