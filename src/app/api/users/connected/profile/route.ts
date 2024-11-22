import { UserProfileDto, UserProfileDtoType } from '@/dtos/user.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { UserServerService } from '@/server/services/user.server-service';

export async function PATCH(req: Request, res: Response) {
	try {
		await setupDbConnection();

		const authUser = HttpHelper.getContextAuthUser();

		const body: UserProfileDtoType = await req.json();

		const validation = UserProfileDto.safeParse(body);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const user = await UserServerService.update(authUser.userId, {
			...body,
			name: `${body.firstName} ${body.lastName}`,
		});

		return Response.json(user, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
