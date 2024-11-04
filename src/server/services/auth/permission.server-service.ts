import { BusinessModel } from '@/server/models/business.model';

export class PermissionServerService {
	static async isBusinessOwner(businessId: string, userId: string) {
		const count = await BusinessModel.countDocuments({
			_id: businessId,
			owner: userId,
		});
		return count > 0;
	}

	static async isBusinessStaff(userId: string, businessId: string) {
		const count = await BusinessModel.countDocuments({
			_id: businessId,
			staff: userId,
		});
		return count > 0;
	}
}
