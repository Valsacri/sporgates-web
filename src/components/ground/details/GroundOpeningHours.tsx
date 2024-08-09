import Card from '@/components/utils/Card';

function GroundOpeningHours({ openingHours }: { openingHours: any }) {
	return (
		<Card title='Opening hours' className='h-max order-1 lg:order-2'>
			<ul className='space-y-4'>
				{Object.entries(openingHours).map(
					([day, timeframe]: any) => (
						<li key={day} className='flex justify-between'>
							<span>{day}</span>
							<span>
								{timeframe.from} - {timeframe.to}
							</span>
						</li>
					)
				)}
			</ul>
		</Card>
	);
}

export default GroundOpeningHours;
