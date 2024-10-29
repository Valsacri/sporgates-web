import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
	try {
		cookies().delete('session');
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