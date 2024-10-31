import Image from 'next/image';

interface GalleryProps {
	images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
	return (
		<div className='grid grid-cols-4 gap-4'>
			{images.map((image, index) => (
				<div key={index} className='col-span-1 aspect-square'>
					<Image src={image} alt={`Image ${index}`} width={300} height={300} />
				</div>
			))}
		</div>
	);
};

export default Gallery;
