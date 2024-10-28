export const toBearerToken = (token?: string | null) => {
	return !token ? '' : `Bearer ${token}`;
};

export const fromBearerToken = (bearerToken?: string | null) => {
	return bearerToken?.split('Bearer ')[1] || '';
};
