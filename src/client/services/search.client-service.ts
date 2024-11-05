import { Axios } from '@/client/config/axios';
import { Business } from '@/types/business.types';
import { User } from '@/types/user.types';

export class SearchClientService {
	static async search(keywords: string) {
		const res = await Axios.get<{
			users: User[];
			businesses: Business[];
		}>('/search', {
			params: { keywords },
		});
		return res.data;
	}
}
