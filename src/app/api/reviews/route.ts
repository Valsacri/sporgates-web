import { CreateReviewDto, CreateReviewDtoType } from "@/dtos/review.dto";
import { setupDbConnection } from "@/server/config/mongodb.config";
import { HttpHelper } from "@/server/helpers/http.helper";
import { ReviewServerService } from "@/server/services/review.server-service";

export async function POST(req: Request, res: Response) {
	try {
		await setupDbConnection();

		const { userId } = HttpHelper.getContextAuthUser();

		const data: CreateReviewDtoType = await req.json();

		const validation = CreateReviewDto.safeParse(data);

		if (!validation.success) {
			return Response.json(validation.error, {
				status: 400,
			});
		}

		const review = await ReviewServerService.create({
			...data,
			createdBy: userId,
		});

		return Response.json(review, {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
