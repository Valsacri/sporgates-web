import { BAD_REQUEST_RESPONSE } from '@/constants';
import { CreateAddressDto } from '@/dtos/item/general.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { AddressServerService } from '@/server/services/geo/address.server-service';
import { NextRequest } from 'next/server';

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { addressId: string } }
) {
	try {
		await setupDbConnection();

		if (!params.addressId) {
			return BAD_REQUEST_RESPONSE;
		}

		const body = await req.json();

		const validation = AddressDto.safeParse(body);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const address = await AddressServerService.update(params.addressId, body);

		return Response.json(address, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { addressId: string } }
) {
	try {
		await setupDbConnection();

		if (!params.addressId) {
			return BAD_REQUEST_RESPONSE;
		}

		await AddressServerService.delete(params.addressId);

		return Response.json(null, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
