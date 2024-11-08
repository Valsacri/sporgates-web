import {
	UpdateUserProfileDto,
	UpdateUserProfileDtoType,
} from '@/dtos/user.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { UserServerService } from '@/server/services/user.server-service';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
	try {
		await setupDbConnection();

		const { userId } = HttpHelper.getContextAuthUser();

		const body: UpdateUserProfileDtoType = await req.json();

		const validation = UpdateUserProfileDto.safeParse(body);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const user = await UserServerService.update(userId, body);

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
