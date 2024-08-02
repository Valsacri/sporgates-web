import React, { ChangeEvent, useRef } from 'react';
import { BiLoader } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';
import { HiX } from 'react-icons/hi';
import Button from './Button';

interface Props {
	imagesUrls: string[];
	onAddImages?: (images: File[]) => void;
	onDeleteImage?: (index: number) => void;
	loading?: boolean;
	className?: string;
	maxImages?: number; // Add maxImages prop
}

export const ImagePicker = ({
	onAddImages,
	onDeleteImage,
	imagesUrls,
	loading,
	className,
	maxImages = Infinity, // Default value for maxImages is Infinity
}: Props) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const pointerClass = loading ? 'cursor-wait' : 'cursor-pointer';

	const handleChooseImage = () => {
		if (loading || imagesUrls.length >= maxImages) {
			return;
		}
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		onAddImages?.(files);

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className={twMerge('flex gap-2 h-20', className)}>
			{onAddImages && (
				<Button
					icon={
						loading ? (
							<BiLoader />
						) : (
							<Icon name='gallery' className='!size-12' />
						)
					}
					color='secondary'
					className='size-20'
					onClick={handleChooseImage}
				></Button>
			)}

			<div className='flex gap-2 overflow-auto'>
				{imagesUrls.map((imageUrl, i) => (
					<div
						key={i}
						className={`relative h-full aspect-square rounded bg-cover bg-center p-1 ${pointerClass}`}
						style={{
							backgroundImage: `url(${imageUrl})`,
						}}
					>
						{onDeleteImage && (
							<Button
								icon={
									<HiX
										className='cursor-pointer size-3'
										onClick={() => onDeleteImage(i)}
									/>
								}
								color='secondary'
								className='p-0 size-5 rounded-full ml-auto'
							></Button>
						)}
					</div>
				))}
			</div>

			<input
				type='file'
				accept='.png, .jpg, .jpeg'
				ref={fileInputRef}
				style={{ display: 'none' }}
				onInput={handleSelectImage}
				multiple={maxImages > 1}
			/>
		</div>
	);
};
