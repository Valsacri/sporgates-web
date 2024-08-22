import { CreateUserDto, CreateUserDtoType } from '@/dtos/user.dto';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { UserServerService } from '@/server/services/user.server-service';

export async function POST(req: Request, res: Response) {
	try {
		await setupDbConnection();

		const data: CreateUserDtoType = await req.json();

		// validate data with zod schema
		const validation = CreateUserDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const user = await UserServerService.create(data);

		return Response.json(user, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
