import {
  BAD_REQUEST_RESPONSE,
  FORBIDDEN_RESPONSE
} from '@/constants';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { HttpHelper } from '@/server/helpers/http.helper';
import { ReviewServerService } from '@/server/services/review.server-service';

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: {
			reviewId: string;
		};
	}
) {
	try {
		await setupDbConnection();

		const { userId } = HttpHelper.getContextAuthUser();

		const review = await ReviewServerService.getOne(params.reviewId);

		if (!review) return BAD_REQUEST_RESPONSE;

		const isOwnReview = review.createdBy === userId;
		if (!isOwnReview) return FORBIDDEN_RESPONSE;

		const deleted = await ReviewServerService.delete(params.reviewId);

		return Response.json(deleted, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
