'use client';

import Button from '@/components/utils/Button';
import { Popup } from '@/components/utils/Popup';
import { useState, useCallback, useContext, useMemo } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import Cropper from 'react-easy-crop';
import { ImageHelper } from '@/client/helpers/image.helper';
import { FilePicker } from '../utils/FilePicker';
import { useFilePicker } from '@/client/hooks/utils/useFilePicker';
import { AlertContext } from '@/client/contexts/alert.context';

interface Props {
	title?: string;
	open: boolean;
	onClose: () => void;
	onUpload: (files: File) => any;
	aspect?: number;
}

function ImageUploadPopup({
	open,
	onClose,
	title,
	onUpload,
	aspect = 1,
}: Props) {
	const { ref, handleOpen, loading, toggleLoading } = useFilePicker();

	const showAlert = useContext(AlertContext);

	const [file, setFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [loadingCrop, setLoadingCrop] = useState(false);

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

	const handleFileSelect = (files: File[]) => {
		if (files[0]) {
			setFile(files[0]);
		}
	};

	const onCropComplete = useCallback((_: any, newCroppedAreaPixels: any) => {
		setCroppedAreaPixels((prev) =>
			JSON.stringify(prev) === JSON.stringify(newCroppedAreaPixels)
				? prev
				: newCroppedAreaPixels
		);
	}, []);

	const handleConfirm = async () => {
		try {
			setLoadingCrop(true);
			if (!file || !croppedAreaPixels) return;
			const croppedImage = await ImageHelper.getCroppedImg(
				URL.createObjectURL(file),
				croppedAreaPixels
			);

			await onUpload(croppedImage);

			showAlert({
				type: 'success',
				message: 'Image uploaded successfully',
			});
			onClose();
		} catch (e) {
			console.error(e);
			showAlert({
				type: 'danger',
				message: 'Failed to upload image',
			});
		} finally {
			setLoadingCrop(false);
		}
	};

	const imageUrl = useMemo(
		() => (file ? URL.createObjectURL(file) : ''),
		[file]
	);

	return (
		<Popup open={open} title={title} onClose={onClose}>
			{file ? (
				<div className='relative w-full h-96'>
					<Cropper
						image={imageUrl}
						crop={crop}
						zoom={zoom}
						aspect={aspect}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={onCropComplete}
					/>
					<Button
						onClick={handleConfirm}
						className='absolute bottom-4 right-4'
						loading={loadingCrop}
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
						'w-full h-full flex flex-col justify-center items-center border-2 border-dotted rounded-md p-10 transition-all duration-200',
						isDragging ? 'bg-success-light' : 'border-gray-300'
					)}
				>
					<AiOutlineCloudUpload className='text-4xl text-gray-500 mb-4' />
					<p className='text-lg text-gray-500 mb-4'>Drag your file here</p>
					<FilePicker ref={ref} onChange={handleFileSelect} accept='image/*' />

					<label htmlFor='fileUpload'>
						<Button
							color='secondary'
							className='text-gray-700'
							onClick={handleOpen}
						>
							Import from your computer
						</Button>
					</label>
				</div>
			)}
		</Popup>
	);
}

export default ImageUploadPopup;
