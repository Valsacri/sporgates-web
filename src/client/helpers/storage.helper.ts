'use client';

import {
	getDownloadURL,
	ref as storageRef,
	uploadBytes,
	getStorage,
	deleteObject,
} from 'firebase/storage';

export class StorageHelper {
	static async uploadFile(path: string, file: File) {
		const timestamp = Date.now();
		const ref = storageRef(getStorage(), `${path}/${timestamp}_${file.name}`);
		await uploadBytes(ref, file);
		const url = await getDownloadURL(ref);
		return url;
	}

	static async deleteFile(url: string) {
		const ref = storageRef(getStorage(), url);
		await deleteObject(ref);
	}
}
