import Card from '@/components/utils/Card';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
	images: string[];
}

function GroundImages({ images }: Props) {
	return (
		<Card className='grid grid-cols-4 gap-2'>
			{images.map((image, index) => (
				<Image
					key={index}
					src={image}
					alt={`Image ${index + 1}`}
					className={twMerge(
						'w-full h-auto rounded-md',
						index === 0 && 'col-span-2 row-span-2'
					)}
					width={200}
					height={100}
				/>
			))}
		</Card>
	);
}

export default GroundImages;
