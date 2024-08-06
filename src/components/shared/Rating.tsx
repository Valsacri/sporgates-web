import { HiOutlineStar, HiStar } from 'react-icons/hi';

interface Props {
	rating: number;
}

function Rating({ rating }: Props) {
	return (
		<div className='flex items-center gap-1'>
			{Array.from({ length: rating }).map((_, index) => (
				<HiStar key={index} className='text-yellow-400' />
			))}
			{Array.from({ length: 5 - rating }).map((_, index) => (
				<HiOutlineStar key={index} className='text-yellow-400' />
			))}
		</div>
	);
}

export default Rating;
