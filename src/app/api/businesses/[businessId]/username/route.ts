import { FORBIDDEN_RESPONSE, USERNAME_CHANGE_INTERVAL } from '@/constants';
import { UpdateUsernameDto, UpdateUsernameDtoType } from '@/dtos/user.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { PermissionServerService } from '@/server/services/auth/permission.server-service';
import { BusinessServerService } from '@/server/services/business.server-service';

export async function PATCH(
	req: Request,
	{
		params,
	}: {
		params: {
			businessId: string;
		};
	}
) {
	try {
		await setupDbConnection();

		const { userId } = HttpHelper.getContextAuthUser();

		const isOwner = PermissionServerService.isBusinessOwner(
			params.businessId,
			userId
		);

		if (!isOwner) {
			return FORBIDDEN_RESPONSE;
		}

		const body: UpdateUsernameDtoType = await req.json();

		const validation = UpdateUsernameDto.safeParse(body);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const now = Date.now();

		const business = await BusinessServerService.getOne(params.businessId);
		if (
			business?.lastUsernameChangeAt &&
			business.lastUsernameChangeAt > now - USERNAME_CHANGE_INTERVAL
		) {
			return Response.json(
				{ message: 'Username change interval not reached' },
				{
					status: 400,
				}
			);
		}

		const updated = await BusinessServerService.update(params.businessId, {
			username: body.username,
			lastUsernameChangeAt: now,
		});

		return Response.json(updated, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
