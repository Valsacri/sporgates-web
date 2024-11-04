import { Notification } from '@/types/notification.types';
import { Axios } from '../config/axios';
import { CreateNotificationDtoType } from '@/dtos/notification.dto';

export class NotificationClientService {
	static async getPage() {
		const res = await Axios.get<Notification[]>('/notifications');
		return res.data;
	}

	static async create(data: CreateNotificationDtoType) {
		const res = await Axios.post<Notification>('/notifications', data);
		return res.data;
	}
}
