export const objectIdToString = (v: any) => {
	if (Array.isArray(v)) {
		return v.map((_v) => {
			if (isPopulated(_v)) {
				return v;
			} else {
				return _v.toString();
			}
		});
	}
	if (isPopulated(v)) {
		return v;
	} else {
		const x = v.toString()
		return v.toString();
	}
};

const isPopulated = (v: any) => !v || v.deletedAt !== undefined;
