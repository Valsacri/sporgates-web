import { Document } from 'mongoose';

export const documentToJson = <T>(document?: Document | null) => {
	if (!document) return null;
	return {
		...document.toJSON(),
		id: document.id as string,
		_id: document.id as string,
	} as T;
};

export const formatDocument = <T>(data?: Document | Document[] | null) => {
	if (Array.isArray(data)) {
		return data.map((document) => documentToJson(document)) as T;
	}
	return documentToJson(data) as T;
};
