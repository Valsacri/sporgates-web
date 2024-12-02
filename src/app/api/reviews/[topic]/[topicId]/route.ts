import { reviewTopicTypeToRoute } from '@/constants';
import { setupDbConnection } from '@/server/config/mongodb.config';
import { ReviewServerService } from '@/server/services/review.server-service';
import { ReviewTopicRoute, ReviewTopicType } from '@/types/review.types';
import { NextRequest } from 'next/server';

export async function GET(
	req: NextRequest,
	{
		params,
	}: {
		params: {
			topic: ReviewTopicRoute;
			topicId: string;
		};
	}
) {
	try {
		await setupDbConnection();

		const topicType = Object.entries(reviewTopicTypeToRoute).find(
			([_, route]) => route === params.topic
		)![0] as ReviewTopicType;

		const grounds = await ReviewServerService.getPage(
			topicType,
			params.topicId
		);

		return Response.json(grounds, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return Response.json(error, {
			status: 500,
		});
	}
}
