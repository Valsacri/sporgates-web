import { User } from '@/types/user.types';
import { Create, Update } from '@/types/utils.types';
import { Axios } from '../config/axios';

export class UserClientService {
	static async getOne(id: string) {
		const res = await Axios.get<User>(`/users/${id}`);
		return res.data;
	}

	static async getConnected() {
		const res = await Axios.get<User>('/users/connected');
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
