import { formatDocument } from '@/server/helpers/database.helper';
import { Notification } from '@/types/notification.types';
import { NotificationModel } from '../../models/notification.model';
import { Create } from '@/types/utils.types';

export class NotificationServerService {
	static async getCount(userId: string) {
		const count = await NotificationModel.countDocuments({
			user: userId,
			read: false,
		});
		return count;
	}

	static async getPage(userId: string, page = 1, limit = 10) {
		const notifications = await NotificationModel.find({ user: userId }, null, {
			limit,
			skip: (page - 1) * limit,
		}).sort({
			createdAt: -1,
		});

		return formatDocument<Notification[]>(notifications);
	}

	static async create(notification: Create<Notification>) {
		const created = await NotificationModel.create(notification);
		if (!created) return null;
		return formatDocument<Notification>(created);
	}

	static async createAll(notifications: Create<Notification>[]) {
		const created = await NotificationModel.insertMany(notifications);
		if (created.length === 0) return [];
		return formatDocument<Notification[]>(created);
	}
}
