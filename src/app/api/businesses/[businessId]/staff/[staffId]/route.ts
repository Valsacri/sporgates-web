import { FORBIDDEN_RESPONSE } from '@/constants';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { PermissionServerService } from '@/server/services/auth/permission.server-service';
import { BusinessServerService } from '@/server/services/business.server-service';

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: {
			businessId: string;
			staffId: string;
		};
	}
) {
	try {
		await setupDbConnection();

		const { userId } = HttpHelper.getContextAuthUser();

		const isBusinessOwner = await PermissionServerService.isBusinessOwner(
			params.businessId,
			userId
		);
		const canRemoveStaff = isBusinessOwner && userId === params.staffId;
		if (canRemoveStaff) {
			return Response.json(
				{ message: 'You cannot remove yourself from the business' },
				{
					status: 400,
				}
			);
		}

		const isStaff = await PermissionServerService.isBusinessStaff(
			params.businessId,
			userId
		);
		const canRemoveItself =
			!isBusinessOwner && isStaff && userId === params.staffId;
		if (!canRemoveItself) {
			return Response.json(
				{ message: 'You can only remove yourself from the business' },
				{
					status: 400,
				}
			);
		}

		const staff = await BusinessServerService.removeStaff(
			params.businessId,
			params.staffId
		);

		return Response.json(staff, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
