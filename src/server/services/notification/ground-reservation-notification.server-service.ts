import { NotificationSubject } from '@/types/notification.types';
import { GroundReservation } from '@/types/item/ground/ground-reservation.types';
import { BusinessModel } from '../../models/business.model';
import { GroundModel } from '../../models/item/ground.model';
import { TimeframeHelper } from '@/helpers/datetime/timeframe.helpers';
import { TimeHelper } from '@/helpers/datetime/time.helpers';
import { DateHelper } from '@/helpers/datetime/date.helpers';
import { NotificationServerService } from './notification.server-service';
import { Business } from '@/types/business.types';
import { Ground } from '@/types/item/ground/ground.types';

export class GroundReservationNotificationServerService {
	private static async getGroundReservationNotificationData(
		reservation: GroundReservation
	) {
		const [business, ground] = await Promise.all([
			BusinessModel.findById(reservation.business),
			GroundModel.findById(reservation.ground),
		]);

		const duration = TimeHelper.formatDuration(
			TimeframeHelper.toDuration(reservation.timeframe)
		);

		const date = DateHelper.formatDate(new Date(reservation.date));

		const timeframe = TimeframeHelper.format(reservation.timeframe);

		return {
			business: business!,
			ground: ground!,
			duration,
			date,
			timeframe,
		};
	}

	static async sendNewReservation(reservation: GroundReservation) {
		const { business, ground, duration, date, timeframe } =
			await this.getGroundReservationNotificationData(reservation);

		const promises = business.staff.map(async (staff) => ({
			user: staff,
			subject: NotificationSubject.NEW_GROUND_RESERVATION,
			read: false,

			title: 'New ground reservation',
			description: `${ground.name} has a new reservation #${reservation.ref} of ${duration} on ${date} at ${timeframe} for ${reservation.totalPrice}DH`,
			url: `/businesses/${business.id}/grounds/reservations`,
			image: business.avatar,
			infos: [business.name],
		}));

		const notifications = await Promise.all(promises);

		await NotificationServerService.createAll(notifications);
	}

	static async sendReservationStatusChange(
		userId: string,
		reservation: GroundReservation
	) {
		const { business, ground, duration, date, timeframe } =
			await this.getGroundReservationNotificationData(reservation);

		await NotificationServerService.create({
			user: userId,
			subject: NotificationSubject.GROUND_RESERVATION_STATUS_CHANGE,
			read: false,

			title: `Ground reservation ${reservation.status}`,
			description: `${ground?.name} reservation #${reservation.ref} of ${duration} on ${date} at ${timeframe} has been ${reservation.status}`,
			url: `/businesses/${business.id}/grounds/reservations`,
			image: business.avatar,
			infos: [business.name],
		});
	}
}
