'use client';

import { useState } from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

interface Props {
	value?: number;
	onChange?: (rating: number) => void;
	className?: string;
	startClassName?: string;
}

function Rating({ value = 0, onChange, className, startClassName }: Props) {
	const [hoveredRating, setHoveredRating] = useState<number | null>(null);

	// Determine the number of stars to fill
	const ratingToDisplay = hoveredRating ?? value;

	return (
		<div className={twMerge('flex items-center gap-0.5', className)}>
			{Array.from({ length: 5 }).map((_, index) => {
				const starIndex = index + 1; // 1-based index for stars

				return (
					<div
						key={index}
						onMouseEnter={() => onChange && setHoveredRating(starIndex)} // Highlight stars on hover
						onMouseLeave={() => onChange && setHoveredRating(null)} // Reset highlight on mouse leave
						onClick={() => onChange?.(starIndex)}
						className={twMerge(onChange && 'cursor-pointer', startClassName)}
					>
						{starIndex <= ratingToDisplay ? (
							<HiStar className='text-yellow-400' />
						) : (
							<HiOutlineStar className='text-yellow-400' />
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Rating;
