export class ImageHelper {
	static getCroppedImg(
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
}
