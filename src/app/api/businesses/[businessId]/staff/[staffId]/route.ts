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

		const isAuthorized = await PermissionServerService.isBusinessOwner(
			params.businessId,
			userId
		);
		if (!isAuthorized) return FORBIDDEN_RESPONSE;

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
