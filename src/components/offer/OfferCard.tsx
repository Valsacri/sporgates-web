import Card from '../utils/Card';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { Offer } from '@/types/business.interface';

interface Props {
	offer: Offer;
}

function OfferCard({ offer }: Props) {
	return (
		<Card className='group lg:min-w-[250px] p-0 flex flex-col hover:bg-primary transition-all duration-200'>
			<Link href={`/page/offers/${offer.id}`}>
				<div
					className={twMerge(
						'h-40 flex flex-col justify-between bg-gray-300 rounded-t-lg bg-cover bg-center'
					)}
					style={{
						backgroundImage: `url(${offer.images[0]})`,
					}}
				>
					<h5 className='w-max bg-primary text-white rounded-tr-lg rounded-bl-3xl pr-3 pl-5 py-1.5 ml-auto'>
						{offer.price} dh/month
					</h5>
				</div>

				<div className='flex flex-col justify-between p-5 pt-3 flex-grow'>
					<div>
						<h3 className='group-hover:text-white transition-all duration-200'>
							{offer.name}
						</h3>
						<div className='text-text-secondary group-hover:text-white transition-all duration-200'>
							<p className='text-sm mt-1'>{offer.description}</p>
						</div>
					</div>
				</div>
			</Link>
		</Card>
	);
}

export default OfferCard;
