import { formatDocument } from '@/server/helpers/database.helper';
import { Notification } from '@/types/notification.types';
import { NotificationModel } from '../models/geo/notification.model';
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
		})
			.populate('payload.new_ground_reservation.groundReservation')
			.populate('payload.reservation_status_change.groundReservation')
			.sort({
				createdAt: -1,
			});

		return formatDocument<Notification[]>(notifications);
	}

	static async create(data: Create<Notification>) {
		const notification = await NotificationModel.create(data);
		if (!notification) return null;
		return formatDocument<Notification>(notification);
	}
}
