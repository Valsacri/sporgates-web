import { User } from '@/types/user.types';
import { Create, Update } from '@/types/utils.types';
import { Axios } from '../config/axios';
import { getAuth } from 'firebase/auth';
import { HttpHelper } from '@/server/helpers/http.helper';
import { toBearerToken } from '@/helpers/http.helpers';

export class UserClientService {
	static async getOne(id: string) {
		const res = await Axios.get<User>(`/users/${id}`);
		return res.data;
	}

	static async getConnected() {
		const token = await getAuth().currentUser?.getIdToken();
		const res = await Axios.get<User>('/users/connected', {
			headers: { Authorization: toBearerToken(token) },
		});
		return res.data;
	}

	static async getPage() {
		const res = await Axios.get<User[]>('/users');
		return res.data;
	}

	static async create(data: Create<User>) {
		const res = await Axios.post<User>('/users', data);
		return res.data;
	}

	static async update(id: string, data: Update<User>) {
		const res = await Axios.put<User>(`/users/${id}`, data);
		return res.data;
	}

	static async delete(id: string) {
		const res = await Axios.delete<User>(`/users/${id}`);
		return res.data;
	}
}
