'use client';

import { twMerge } from 'tailwind-merge';

interface Props {
	images: string[];
}

function GroundImages({ images }: Props) {
	return (
		<div
			className='grid grid-cols-4 grid-rows-2 gap-1 h-[120px] lg:h-[350px]'
		>
			<GalleryImage
				image={images[0]}
				className={twMerge(
					'row-span-2 col-span-4',
					images.length === 1 ? 'col-span-4' : 'col-span-2'
				)}
			></GalleryImage>

			{images.length === 2 && (
				<GalleryImage
					image={images[1]}
					className='col-span-2 row-span-2'
				></GalleryImage>
			)}

			{images.length > 2 && (
				<div className='col-span-2 grid row-span-2 grid-rows-2 gap-1'>
					<div className='grid grid-cols-2 gap-1'>
						{(images.length === 3 || images.length === 4) && (
							<GalleryImage image={images[1]} className='col-span-2' />
						)}
						{images.length === 5 && (
							<>
								<GalleryImage image={images[1]} />
								<GalleryImage image={images[2]} />
							</>
						)}
					</div>

					<div className='grid grid-cols-2 gap-1'>
						{images.length === 3 && (
							<GalleryImage image={images[2]} className='col-span-2' />
						)}
						{images.length === 4 && (
							<>
								<GalleryImage image={images[2]} />
								<GalleryImage image={images[3]} />
							</>
						)}
						{images.length === 5 && (
							<>
								<GalleryImage image={images[3]} />
								<GalleryImage image={images[4]} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default GroundImages;

function GalleryImage({ image, className }: any) {
	return (
		<div
			className={twMerge('size-full rounded-lg bg-cover bg-center', className)}
			style={{
				backgroundImage: `url(${image})`,
			}}
		></div>
	);
}
