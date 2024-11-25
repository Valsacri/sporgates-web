import { USERNAME_CHANGE_INTERVAL } from '@/constants';
import { UsernameDto, UsernameDtoType } from '@/dtos/user.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
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

		const authUser = HttpHelper.getContextAuthUser();

		const body: UsernameDtoType = await req.json();

		const validation = UsernameDto.safeParse(body);

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
