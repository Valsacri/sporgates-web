import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	async (config) => {
		if (typeof window === 'undefined') {
			return config;
		}

		const token = await getAuth().currentUser?.getIdToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		if (error.response.status === 401) {
// 			signOut(getAuth());
// 		}
// 		return Promise.reject(error);
// 	}
// );

export const Axios = axiosInstance;
