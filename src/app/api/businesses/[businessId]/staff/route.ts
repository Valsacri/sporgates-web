import { FORBIDDEN_RESPONSE } from '@/constants';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { PermissionServerService } from '@/server/services/auth/permission.server-service';
import { BusinessServerService } from '@/server/services/business.server-service';
import { NextRequest } from 'next/server';

export async function GET(
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

		const isBusinessOwner = await PermissionServerService.isBusinessOwner(
			params.businessId,
			userId
		);
		if (!isBusinessOwner) return FORBIDDEN_RESPONSE;

		const staff = await BusinessServerService.getStaff(params.businessId);

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

export async function POST(
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

		const isBusinessOwner = await PermissionServerService.isBusinessOwner(
			params.businessId,
			userId
		);
		if (!isBusinessOwner) return FORBIDDEN_RESPONSE;

		const body = await req.json();

		if (!body.staff) {
			return Response.json('Staff is required', {
				status: 400,
			});
		}

		const staff = await BusinessServerService.addStaff(
			params.businessId,
			body.staff
		);

		return Response.json(staff, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
