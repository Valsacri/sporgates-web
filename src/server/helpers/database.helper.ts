import mongoose, { Document } from 'mongoose';

export const documentToObject = <T>(document?: Document | null) => {
	if (!document) return null;
	const obj = {
		...document.toJSON(),
		id: document.id as string,
		_id: document.id as string,
	} as T;
	return obj;
};

export const formatDocument = <T>(data?: Document | Document[] | null) => {
	if (!data) return null;

	if (Array.isArray(data)) {
		return data.map((document) =>
			replaceObjectIdsWithStrings({ ...document.toObject(), id: document.id })
		) as T;
	}
	return replaceObjectIdsWithStrings({
		...data.toObject(),
		id: data.id,
	}) as T;
};

// Function to replace ObjectIds with their string representations
const replaceObjectIdsWithStrings = (obj: any) => {
	for (const key in obj) {
		if (mongoose.isValidObjectId(obj[key]?.toString())) {
			obj[key] = obj[key].toString(); // Convert ObjectId to string
		} else if (Array.isArray(obj[key])) {
			// If it's an array, recursively apply the function to each item
			obj[key] = obj[key].map((item: any) => replaceObjectIdsWithStrings(item));
		} else if (typeof obj[key] === 'object' && obj[key] !== null) {
			// If it's a nested object, recursively apply the function
			replaceObjectIdsWithStrings(obj[key]);
		}
	}
	return obj;
};
