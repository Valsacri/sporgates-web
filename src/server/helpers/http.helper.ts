import { User } from '@/types/user.types';

export const getServerUser = (req: Request) =>
	JSON.parse(req.headers.get('user')!) as User;
