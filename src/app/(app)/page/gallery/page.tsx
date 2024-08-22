'use client';

import Gallery from '@/components/gallery/Gallery';
import Button from '@/components/utils/Button';
import { Popup } from '@/components/utils/Popup';
import { usePopup } from '@/client/hooks/utils/usePopup';
import { useState, useCallback } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import Cropper from 'react-easy-crop';

function getCroppedImg(
	imageSrc: string,
	pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> {
	return new Promise((resolve, reject) => {
		const image = new window.Image();
		image.src = imageSrc;
		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = pixelCrop.width;
			canvas.height = pixelCrop.height;
			const ctx = canvas.getContext('2d');

			if (!ctx) {
				reject(new Error('Failed to get canvas context'));
				return;
			}

			ctx.drawImage(
				image,
				pixelCrop.x,
				pixelCrop.y,
				pixelCrop.width,
				pixelCrop.height,
				0,
				0,
				pixelCrop.width,
				pixelCrop.height
			);

			canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error('Canvas is empty'));
					return;
				}

				const file = new File([blob], 'croppedImage.png', {
					type: 'image/png',
				});
				resolve(URL.createObjectURL(file));
			}, 'image/png');
		};
		image.onerror = () => {
			reject(new Error('Failed to load image'));
		};
	});
}

function Page() {
	const [file, setFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [open, toggleOpen] = usePopup();
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(false);
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			setFile(event.dataTransfer.files[0]);
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const handleConfirm = async () => {
		try {
			if (!file || !croppedAreaPixels) return;
			const croppedImage = await getCroppedImg(
				URL.createObjectURL(file),
				croppedAreaPixels
			);
			// Do something with croppedImage, e.g., save it to state
		} catch (e) {
			console.error(e);
		}
	};

	const images = [
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
		'https://sporgates.com/upload/photos/d-avatar.jpg?cache=0',
	];

	return (
		<>
			<Button
				icon='plus'
				color='primary'
				className='fixed bottom-5 right-5 p-7 rounded-full'
				iconClassName='!size-12'
				onClick={toggleOpen}
			></Button>

			<Popup
				open={open}
				title='Create a post'
				description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				onClose={toggleOpen}
			>
				{file ? (
					<div className='relative w-full h-96'>
						<Cropper
							image={URL.createObjectURL(file)}
							crop={crop}
							zoom={zoom}
							aspect={1}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={onCropComplete}
						/>
						<Button
							onClick={handleConfirm}
							className='absolute bottom-4 right-4'
						>
							Confirm
						</Button>
					</div>
				) : (
					<div
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						className={twMerge(
							'w-full h-full flex flex-col justify-center items-center border-2 border-dotted rounded-lg p-10 transition-all duration-200',
							isDragging ? 'bg-success-light' : 'border-gray-300'
						)}
					>
						<AiOutlineCloudUpload className='text-4xl text-gray-500 mb-4' />
						<p className='text-lg text-gray-500 mb-4'>Drag your file here</p>
						<input
							type='file'
							id='fileUpload'
							accept='image/*'
							onChange={handleFileSelect}
							className='hidden'
						/>
						<label htmlFor='fileUpload'>
							<Button color='secondary' className='text-gray-700'>
								Import from your computer
							</Button>
						</label>
					</div>
				)}
			</Popup>

			<Gallery images={images} />
		</>
	);
}

export default Page;
