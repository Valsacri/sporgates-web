'use client';

import { useEffect, useState } from 'react';

/**
 * Manages the state of images list
 *
 * Returns handlers for adding/removing images from the list and for uploading/deleting images
 */
export const useImages = (
	initImagesUrls: string[],
	onUploadImage: (image: File) => any,
	onDeleteImage: (imageUrl: string) => any,
	deps: any[] = []
) => {
	// images urls that will be shown in the UI
	const [imagesUrls, setImagesUrls] = useState<string[]>([]);
	// images that were added to the list after initImagesUrls was set
	const [addedImages, setAddedImages] = useState<File[]>([]);
	// images that were removed from the list after initImagesUrls was set
	const [removedImages, setRemovedImages] = useState<string[]>([]);

	// reset the state when initImagesUrls changes
	useEffect(() => {
		setImagesUrls(initImagesUrls);
		setAddedImages([]);
		setRemovedImages([]);
	}, [...deps]);

	// upload the added images
	const handleUploadImages = async () => {
		const urls = await Promise.all(
			addedImages.map(async (image) => onUploadImage(image))
		);
		return urls.filter((url) => url);
	};

	// delete the removed images
	const handleDeleteImages = async () => {
		await Promise.all(
			removedImages.map(async (imageUrl) => onDeleteImage(imageUrl))
		);
	};

	// add images to the list and to the added images
	const handleAddImages = (images: File[]) => {
		if (!images || images.length === 0) {
			return;
		}

		const newImagesUrls = images.map((image) => URL.createObjectURL(image));
		setImagesUrls([...imagesUrls, ...newImagesUrls]);
		setAddedImages([...addedImages, ...images]);
	};

	// remove an image from the list and to the removed images
	const handleRemoveImage = (index: number) => {
		const newImagesUrls = [...imagesUrls];
		newImagesUrls.splice(index, 1);
		setImagesUrls(newImagesUrls);

		setRemovedImages([...removedImages, imagesUrls[index]]);
	};

	// get the images that were in initImagesUrls and were not removed
	const unremovedImagesUrls =
		initImagesUrls?.filter((url) => !removedImages.includes(url)) || [];

	return {
		imagesUrls,

		addedImages,
		removedImages,
		unremovedImagesUrls,

		handleAddImages,
		handleRemoveImage,

		handleUploadImages,
		handleDeleteImages,
	};
};
