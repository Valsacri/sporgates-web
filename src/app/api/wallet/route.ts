import {
	WalletDepositeDto,
	WalletDepositeDtoType,
} from '@/dtos/wallet/wallet.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { getServerUser } from '@/server/helpers/http.helper';
import { WalletServerService } from '@/server/services/wallet.server-service';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const user = getServerUser(req);

		const balance = await WalletServerService.getBalance(user.id);

		return Response.json(balance, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}

export async function POST(req: NextRequest, res: Response) {
	try {
		await setupDbConnection();

		const user = getServerUser(req);

		const data: WalletDepositeDtoType = await req.json();

		const validation = WalletDepositeDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const balance = await WalletServerService.deposit(data.amount, user.id);

		return Response.json(balance, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
