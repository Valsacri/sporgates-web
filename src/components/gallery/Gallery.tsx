import Image from 'next/image';
import Card from '../utils/Card';

interface GalleryProps {
	images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
	return (
		<div className='grid grid-cols-3 gap-4'>
			{images.map((image, index) => (
				<div key={index} className='col-span-1 aspect-square'>
					<Card className='p-0'>
						<Image src={image} alt={`Image ${index}`} width={300} height={300} />
					</Card>
				</div>
			))}
		</div>
	);
};

export default Gallery;
