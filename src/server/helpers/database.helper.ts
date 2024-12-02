import mongoose from 'mongoose';

export const documentToObject = <T>(document?: any) => {
	if (!document) return null;
	const obj = {
		...document.toJSON(),
		id: document.id as string,
		_id: document.id as string,
	} as T;
	return obj;
};

export const formatDocument = <T>(data?: any) => {
	if (!data) return null as T;

	if (Array.isArray(data)) {
		return data.map((document) => {
			const doc = document.toObject ? document.toObject() : document;
			return replaceObjectIdsWithStrings({
				...doc,
				id: doc._id.toString(),
			});
		}) as T;
	}

	const doc = data.toObject ? data.toObject() : data;

	return replaceObjectIdsWithStrings({
		...doc,
		id: doc._id.toString(),
	}) as T;
};

// Function to replace ObjectIds with their string representations
const replaceObjectIdsWithStrings = (obj: any) => {
	for (const key in obj) {
		if (Array.isArray(obj[key])) {
			// If it's an array, recursively apply the function to each item
			obj[key] = obj[key].map((item: any) => {
				if (mongoose.isValidObjectId(item?.toString())) {
					return item.toString();
				}
				return replaceObjectIdsWithStrings(item);
			});
		} else if (mongoose.isValidObjectId(obj[key]?.toString())) {
			obj[key] = obj[key].toString(); // Convert ObjectId to string
			if (key === '_id') {
				obj.id = obj[key]; // Convert _id to id
				delete obj._id;
			}
		} else if (typeof obj[key] === 'object' && obj[key] !== null) {
			// If it's a nested object, recursively apply the function
			replaceObjectIdsWithStrings(obj[key]);
		}
	}
	return obj;
};

export const getGeoLocationQuery = (filters: {
	lat?: number;
	lng?: number;
	radius?: number;
}) => {
	return {
		$nearSphere: {
			$geometry: {
				type: 'Point',
				coordinates: [filters.lat, filters.lng], // Longitude first, then Latitude
			},
			$maxDistance: (filters.radius || 0) * 1000, // Radius in meters
		},
	};
};

export const valueOrEmptyObject = (condition: any, value: any) =>
	condition ? value : {};
