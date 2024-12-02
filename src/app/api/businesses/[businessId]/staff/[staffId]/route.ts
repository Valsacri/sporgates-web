import { BAD_REQUEST_RESPONSE, FORBIDDEN_RESPONSE } from '@/constants';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { PermissionServerService } from '@/server/services/auth/permission.server-service';
import { BusinessServerService } from '@/server/services/business.server-service';
import { User } from '@/types/user.types';

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

		const business = await BusinessServerService.getOne(params.businessId);

		if (!params.businessId || !params.staffId || !business) {
			return BAD_REQUEST_RESPONSE;
		}

		const owner = business.owner as string;
		const staff = business.staff as string[];

		if (owner === userId) {
			if (owner === params.staffId) {
				return FORBIDDEN_RESPONSE;
			} else if (!staff.includes(params.staffId)) {
				return BAD_REQUEST_RESPONSE;
			}
		} else {
			if (!(staff as string[]).includes(userId)) {
				return BAD_REQUEST_RESPONSE;
			} else if (userId !== params.staffId) {
				return FORBIDDEN_RESPONSE;
			}
		}

		const newStaff = await BusinessServerService.removeStaff(
			params.businessId,
			params.staffId
		);

		return Response.json(newStaff, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
