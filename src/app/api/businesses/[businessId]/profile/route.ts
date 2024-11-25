import { FORBIDDEN_RESPONSE } from '@/constants';
import {
	UpdateBusinessProfileDto,
	UpdateBusinessProfileDtoType,
} from '@/dtos/business.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { PermissionServerService } from '@/server/services/auth/permission.server-service';
import { BusinessServerService } from '@/server/services/business.server-service';
import { NextRequest } from 'next/server';

export async function PATCH(
	req: NextRequest,
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

		const isStaff = PermissionServerService.isBusinessStaff(
			userId,
			params.businessId
		);
		if (!isStaff) return FORBIDDEN_RESPONSE;

		const body: UpdateBusinessProfileDtoType = await req.json();

		const validation = UpdateBusinessProfileDto.safeParse(body);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const user = await BusinessServerService.update(params.businessId, body);

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
