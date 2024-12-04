import { BAD_REQUEST_RESPONSE } from '@/constants';
import { CreateAddressDto } from '@/dtos/item/general.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { AddressServerService } from '@/server/services/geo/address.server-service';
import { Address } from '@/types/geo.types';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const { searchParams } = req.nextUrl;
		const user = searchParams.get('user');
		const business = searchParams.get('business');

		let addresses: Address[] = [];

		if (user) {
			addresses = await AddressServerService.getByUser(user);
		} else if (business) {
			addresses = await AddressServerService.getByBusiness(business);
		} else {
			return BAD_REQUEST_RESPONSE;
		}

		return Response.json(addresses, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}

export async function POST(req: Request, res: Response) {
	try {
		await setupDbConnection();

		const body = await req.json();

		const validation = CreateAddressDto.safeParse(body);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const address = await AddressServerService.create(body);

		return Response.json(address, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
