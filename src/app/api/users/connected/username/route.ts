import { USERNAME_CHANGE_INTERVAL } from '@/constants';
import { UsernameDto, UsernameDtoType } from '@/dtos/user.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { UserServerService } from '@/server/services/user.server-service';

export async function PATCH(req: Request, res: Response) {
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

		const user = await UserServerService.getOne(authUser.userId);
		if (
			user?.lastUsernameChangeAt &&
			user.lastUsernameChangeAt > now - USERNAME_CHANGE_INTERVAL
		) {
			return Response.json(
				{ message: 'Username change interval not reached' },
				{
					status: 400,
				}
			);
		}

		const updated = await UserServerService.update(authUser.userId, {
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
